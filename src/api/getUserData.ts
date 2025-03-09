import { BASE_URL } from '@/constants';
import { isTokenExpired } from '@/hooks/customs/useAuth';
import type { IUser } from '@/types/userType';

//함수: 로그인 된 유저데이터를 fetch함. 토큰 만료 확인함
const getUserData = async (): Promise<IUser> => {
	const token = localStorage.getItem('authToken'); // 저장된 토큰 가져오기
	// 토큰이 없으면 에러 처리
	if (token === null) {
		throw new Error('No token found');
	}
	// 토큰이 만료되었으면 에러 처리
	if (isTokenExpired(token)) {
		throw new Error('No token found or token has expired');
	}
	console.log('현재 로그인 된 유저의 토큰: ', token);

	const response = await fetch(`${process.env.BASE_URL}/auths/user`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		const error = await response.json();
		console.error(error);
		throw new Error(error.message || 'Unknown error');
	}

	const data = await response.json();
	console.log(data);
	return data;
};

export { isTokenExpired, getUserData };
