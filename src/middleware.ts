import { NextResponse, type NextRequest } from 'next/server';

// middleware 에서 cookie 에 있는 token 값을 header에 세팅한다
export function middleware(request: NextRequest) {
	const response = NextResponse.next();

	const token = request.cookies.get('token');

	// 만약 cookie 에 저장된 token 값이 없다면 redirect
	if (!token) {
		console.log('no token in middleware');
		return;
	}

	// Aurhotization header에 token 값 세팅
	response.headers.set('Authorization', `Bearer ${token?.value}`);

	return response;
}
