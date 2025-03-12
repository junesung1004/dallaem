import { BASE_URL } from '@/constants';
import { cookies, headers } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET() {
	const headersList = await headers();
	const token = headersList.get('Authorization');
	const res = await fetch(`${BASE_URL}/auths/user`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`,
		},
	});
	const data = await res.json();

	return Response.json({ data });
}

// cookie 에 token을 저장하는 api
export async function POST(request: NextRequest) {
	const requestHeaders = new Headers(request.headers);
	const bearerToken = requestHeaders.get('Authorization');
	const token = bearerToken?.replace('Bearer ', '');

	if (token) {
		const cookieStore = await cookies();
		cookieStore.set({
			name: 'token',
			value: token,
			httpOnly: true,
			path: '/',
		});
	}
	return new Response('token saved', {
		status: 200,
	});
}
