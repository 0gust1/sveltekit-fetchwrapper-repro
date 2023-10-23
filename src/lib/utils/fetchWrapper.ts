/**
 * This wrapper lib is intended to facilitate error handling when using fetch
 * It wraps fetch, allowing to discriminate between various errors
 *
 * refs:
 * https://kentcdodds.com/blog/using-fetch-with-type-script
 * https://www.newline.co/@bespoyasov/how-to-use-fetch-with-typescript--a81ac257
 */

import { HTTPError, NetworkError } from './serviceErrors';
import { getErrorMessage } from './nativeErrorsUtils';
// this type (imperfectly) models any possible parsed JSON value
// it is used as default type for the generic type parameter of the http function and the get/post/patch/del functions
type DefaultFetchReturnType = Record<string, unknown> | Array<unknown>;

interface HttpResponse<T> extends Response {
	parsedBody: T;
}

const getRequestUrl = (request: URL | RequestInfo) => {
	if (request instanceof URL) {
		return request.href;
	} else {
		if (typeof request === 'string') {
			return request;
		} else {
			return request.url;
		}
	}
};

export async function http<T = DefaultFetchReturnType>(
	request: URL | RequestInfo,
	fetchLib: typeof fetch = fetch
) {
	let response: Response;
	const requestUrl = getRequestUrl(request);

	// here we handle pure network errors, like CORS issues, non-existent domains, invalid etc.
	try {
		response = await fetchLib(request);
	} catch (ex) {
		const errorMsg = getErrorMessage(ex);
		console.error(`Error fetching external resource ${requestUrl}: ${errorMsg}`);
		return new NetworkError(`Error fetching external resource ${requestUrl}: ${errorMsg}`);
	}

	const responseWrapped = response as HttpResponse<T>;
	// here we handle the case where the response didn't contain any JSON body
	try {
		// may error if there is no body.
		// At HTTP level, no JSON body is valid, *but* for JSON APIs it is discouraged (maybe TODO: this point)
		const parsedBody = await response.json();
		responseWrapped.parsedBody = parsedBody;
	} catch (ex) {
		console.warn(`fetch call: no parseable json body in the response from ${request}`);
		// the "as T" is a bit dubious here.
		responseWrapped.parsedBody = {
			message: `${responseWrapped?.statusText ?? 'no status text, nor json body'}`
		} as T;
	}
	// here we handle the case where we got a non 2xx response
	if (!response.ok) {
		console.warn(`non Ok response from calling the resource ${requestUrl}`);
		return new HTTPError(
			`${responseWrapped.statusText ?? ''} ${
				responseWrapped.parsedBody ? JSON.stringify(responseWrapped.parsedBody) : ''
			}`,
			responseWrapped.status,
			responseWrapped?.statusText,
			responseWrapped.parsedBody ?? null
		);
	}
	return responseWrapped.parsedBody;
}

export async function get<T = DefaultFetchReturnType>(
	path: string,
	args: RequestInit = {},
	fetchLib: typeof fetch = fetch
): Promise<T | NetworkError | HTTPError> {
	const defaultArgs = { method: 'get' };
	return await http<T>(new Request(path, { ...defaultArgs, ...args }), fetchLib);
}

export async function post<T = DefaultFetchReturnType>(
	path: string,
	payLoad: Record<string, unknown> | Array<unknown>,
	args: RequestInit = {},
	fetchLib: typeof fetch = fetch
): Promise<T | NetworkError | HTTPError> {
	const defaultArgs = { method: 'post', body: JSON.stringify(payLoad) };
	return await http<T>(new Request(path, { ...defaultArgs, ...args }), fetchLib);
}

export async function put<T = DefaultFetchReturnType>(
	path: string,
	payLoad: Record<string, unknown> | Array<unknown>,
	args: RequestInit = {},
	fetchLib: typeof fetch = fetch
): Promise<T | NetworkError | HTTPError> {
	const defaultArgs = { method: 'put', body: JSON.stringify(payLoad) };
	return await http<T>(new Request(path, { ...defaultArgs, ...args }), fetchLib);
}

export async function patch<T = DefaultFetchReturnType>(
	path: string,
	payLoad: Record<string, unknown> | Array<unknown>,
	args: RequestInit = {},
	fetchLib: typeof fetch = fetch
): Promise<T | NetworkError | HTTPError> {
	const defaultArgs = { method: 'patch', body: JSON.stringify(payLoad) };
	return await http<T>(new Request(path, { ...defaultArgs, ...args }), fetchLib);
}

export async function del<T = DefaultFetchReturnType>(
	path: string,
	payLoad: Record<string, unknown> | Array<unknown>,
	args: RequestInit = {},
	fetchLib: typeof fetch = fetch
): Promise<T | NetworkError | HTTPError> {
	const defaultArgs = { method: 'delete', body: JSON.stringify(payLoad) };
	return await http<T>(new Request(path, { ...defaultArgs, ...args }), fetchLib);
}
