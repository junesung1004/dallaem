import { BASE_URL } from '@/constants';
import { cookies, headers } from 'next/headers';

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

export async function POST(request: Request) {
	const reqBody = await request.json();

	const res = await fetch(`${BASE_URL}/auths/signin`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(reqBody),
	});

	const data = await res.json();

	// data 가 제대로 넘어오면 token cookie 에 심기
	if (data) {
		const cookieStore = await cookies();

		cookieStore.set({
			name: 'token',
			value: data.token,
			httpOnly: true,
			path: '/',
		});
	}
	return Response.json(data);
}
