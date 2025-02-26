import { removeLike } from '@/lib/likeStorage';
import type { ILikeListJSON } from '@/types/likeButtonType';

// 로컬 스토리지에서 값을 가져오는 함수
export const getLocalStorageItem = <T>(key: string, defaultValue: T): T => {
	if (typeof window === 'undefined') {
		return defaultValue;
	}
	try {
		const storedValue = localStorage.getItem(key);
		if (storedValue) {
			return JSON.parse(storedValue) as T;
		} else {
			return defaultValue;
		}
	} catch (error) {
		console.error(
			`Error parsing JSON from localStorage for key "${key}":`,
			error,
		);
		return defaultValue;
	}
};

/** 로그인한 사용자 또는 guest ID를 반환하는 함수 */
export const getLikerKey = ({
	likeList,
	user,
	isLoggedIn,
}: {
	likeList: ILikeListJSON;
	user: number | null;
	isLoggedIn: boolean;
}) => {
	const likerKey = Object.keys(likeList).find((key) => {
		// debugger;
		// return Object.keys(likeList).find((key) => {

		if (!(user && isLoggedIn)) {
			// 로그인되지 않은 경우 guestId를 사용
			const guestId = getLocalStorageItem<string>('guestId', '');
			return Number(key) === Number(guestId);
		}

		return Number(key) === Number(user);
	});

	return likerKey;
};

/** 로컬 스토리지에 저장된 찜한 모임 id 중 특정 id를 삭제하는 함수 */
export const deleteLikeId = (idList: number[], userId: number | null) => {
	idList?.forEach((id) => {
		removeLike(id, userId);
	});
};
