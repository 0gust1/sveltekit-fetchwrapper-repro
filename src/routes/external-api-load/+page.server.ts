import type { PageServerLoad } from './$types';

export const load = (async ({ fetch: skFetch }) => {
	const res = await skFetch('https://jsonplaceholder.typicode.com/todos/1');
	const data = await res.json();
	return {
		data
	};
}) satisfies PageServerLoad;
