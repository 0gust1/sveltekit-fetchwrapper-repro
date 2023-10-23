import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const id = params.id;

	return json({ id, messsage: `Hello from the server, with id ${id}` });
};
