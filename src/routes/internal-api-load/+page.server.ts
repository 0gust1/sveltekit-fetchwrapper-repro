import type { PageServerLoad } from './$types';

export const load = (async ({ fetch: skFetch }) => {
	const res = await skFetch('/api/example-123');
	const data = await res.json();
	return { data };
}) satisfies PageServerLoad;
