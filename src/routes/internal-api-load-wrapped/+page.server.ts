import type { PageServerLoad } from './$types';
import { get } from '$lib/utils/fetchWrapper';
import { error } from '@sveltejs/kit';
export const load = (async ({ fetch: skFetch }) => {
	const resOrError = await get('/api/example-123', {}, skFetch);

	if (resOrError instanceof Error) {
		throw error(500, resOrError.message);
	}

	return { data: resOrError };
}) satisfies PageServerLoad;
