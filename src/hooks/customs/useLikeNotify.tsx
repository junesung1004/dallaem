import { useAuthStore } from '@/store/useAuthStore';
import useNotificationStore from '@/store/useNotificationStore';
import { useCallback } from 'react';

// 로컬 스토리지에서 값을 가져오는 함수
/** utils로 변경 예정 */
function getLocalStorageItem<T>(key: string, defaultValue: T): T {
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
}

/** 로그인한 사용자 또는 guest ID를 반환하는 함수 */
/** utils로 변경 예정 */
function getLikerKey({
	likeList,
	user,
	isLoggedIn,
}: {
	likeList: ILikeListJSON;
	user: number | null;
	isLoggedIn: boolean;
}) {
	return Object.keys(likeList).find((key) => {
		if (!(user && isLoggedIn)) {
			// 로그인되지 않은 경우 guestId를 사용
			const guestId = getLocalStorageItem<string>('guestId', '');
			return Number(key) === Number(guestId);
		}
		return Number(key) === Number(user);
	});
}

interface ILikeListJSON {
	[key: string]: number[] | string[];
}

export const useLikeNotify = () => {
	const hasHydrated = useAuthStore((state) => state.hasHydrated);
	const userId = useAuthStore((state) => state.userId);
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

	const updateNotification = useNotificationStore(
		(state) => state.updateNotification,
	);
	const pageKey = 'favorite-meetings';

	// likeList는 최신 상태 유지
	const likeList = getLocalStorageItem<ILikeListJSON>('likes', {});

	const likerKey = hasHydrated
		? getLikerKey({ likeList, user: userId, isLoggedIn })
		: null;

	// 최신 localStorage 값을 가져오는 onChangeLike
	const onChangeLike = useCallback(() => {
		const latestLikeList = getLocalStorageItem<
			Record<string, number[] | string[]>
		>('likes', {});

		if (!likerKey) {
			return;
		}

		const count = latestLikeList[likerKey]?.length ?? 0;
		updateNotification(pageKey, count > 0, count);
	}, [likerKey, updateNotification, pageKey]);

	return { onChangeLike };
};
