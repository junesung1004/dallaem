import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { jwtDecode } from 'jwt-decode';
import useNotificationStore from '@/store/useNotificationStore';

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

//함수: 사용자 인증
const useAuth = () => {
	const pathname = usePathname();
	const router = useRouter();
	const { resetNotifications } = useNotificationStore();
	// 상태관리 변수
	const setUserNull = useAuthStore((state) => state.setUserNull);

	// 함수: 로그아웃
	const logoutUser = () => {
		localStorage.removeItem('authToken');
		setUserNull();
		resetNotifications();
		//로그아웃 되었습니다. 메인 페이지로 이동합니다
		router.push('/');
	};

	// 함수: 토큰 유효성 검증
	const validateToken = () => {
		const currentToken = useAuthStore.getState().token; //최신 값 가져옴
		if (!currentToken) {
			//현재 로그인 상태: 토큰 없음
			return;
		}
		const isValid = !isTokenExpired(currentToken);
		if (!isValid) {
			logoutUser();
			return;
		}
	};

	// 페이지 이동 시 토큰 검증
	useEffect(() => {
		validateToken();
	}, [pathname]);

	return { validateToken, logoutUser };
};

export { isTokenExpired, useAuth };
