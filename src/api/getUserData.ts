import type { IUser } from '@/types/userType';
import { jwtDecode } from 'jwt-decode';

//함수: 토큰 디코딩하여 시간 만료되었는지 유효성 검증
const isTokenExpired = (token: string): boolean => {
	try {
		const decoded: any = jwtDecode(token); // 토큰 디코딩
		if (!decoded.exp) return true; // exp 값이 없으면 만료된 것으로 간주

		const currentTime = Math.floor(Date.now() / 1000); // 현재 시간 (초 단위)
		return decoded.exp < currentTime; // 만료 시간이 현재 시간보다 작으면 true (만료됨)
	} catch (error) {
		console.error('Invalid token:', error);
		return true; // 오류 발생 시 만료된 것으로 간주
	}
};
//함수: 로그인 된 유저데이터를 fetch함. 토큰 만료 확인함
const getUserData = async (): Promise<IUser> => {
	const token = localStorage.getItem('authToken'); // 저장된 토큰 가져오기
	// 토큰이 없으면 에러 처리
	if (token === null) {
		throw new Error('No token found');
	}
	// 토큰이 만료되었으면 에러 처리, 토큰을 삭제하고 로그인 상태를 종료
	if (isTokenExpired(token)) {
		localStorage.removeItem('authToken');
		throw new Error('No token found or token has expired');
	}
	console.log('현재 로그인 된 유저의 토큰: ', token);

	const response = await fetch(
		`https://fe-adv-project-together-dallaem.vercel.app/7/auths/user`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		},
	);

	if (!response.ok) {
		const error = await response.json();
		console.error(error);
		throw new Error(error.message || 'Unknown error');
	}

	const data = await response.json();
	console.log(data);
	// return true;
	return data;
};

export { isTokenExpired, getUserData };
