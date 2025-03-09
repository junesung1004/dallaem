import { BASE_URL } from '@/constants';
import { IUser } from '@/types/userType';

// 클라이언트/서버 공통 api
export const getUserInfo = async (options: {
	headers: {
		Authorization: string;
	};
}): Promise<IUser> => {
	// 받아온 option 을 적용해서 fetch 하기
	const url = `${BASE_URL}/auths/user`;
	const res = await fetch(url, options);

	// 응답이 잘못되면 throw error
	if (!res.ok) {
		/**
		 * 향후 에러 공통화 되면 수정할 부분
		 */
		const error = await res.json();
		console.error(error.message);
		throw new Error(error?.code);
	}
	return res.json();
};

/** 사용자 정보 수정 / formData 사용 */
export const editProfile = async (data: FormData) => {
	const token = localStorage.getItem('authToken');

	const res = await fetch(`${BASE_URL}/auths/user`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: data,
	});

	if (!res.ok) {
		return null;
	}

	return res?.json();
};
