import { useAuthStore } from '@/store/useAuthStore';
import useNotificationStore from '@/store/useNotificationStore';
import { useCallback, useEffect } from 'react';
import { getLikerKey, getLocalStorageItem } from '@/utils/localStorage';
import type { ILikeListJSON } from '@/types/likeButtonType';

export const useLikeNotify = () => {
	const userId = useAuthStore((state) => state.userId);
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

	const updateNotification = useNotificationStore(
		(state) => state.updateNotification,
	);
	const { notifications } = useNotificationStore();
	const pageKey = 'favorite-meetings';
	const likeNotification = notifications[pageKey];

	// likeList는 최신 상태 유지
	const likeList = getLocalStorageItem<ILikeListJSON>('likes', {});

	const likerKey =
		userId || !isLoggedIn
			? getLikerKey({ likeList, user: userId, isLoggedIn })
			: null;

	/** 찜한 모임 likerId 받아와야 하는 경우
	 * 1. 로그인한 유저 -> hasHydrated  true, userId true, isLoggedIn true
	 * 2. 비로그인 유저 -> hasHydrated false, userId false, guestId true,
	 */

	useEffect(() => {
		if (likerKey === null) return;

		const count = likeList[likerKey ?? '']?.length ?? 0;
		updateNotification(pageKey, count > 0, count);
	}, [userId]);

	// 최신 localStorage 값을 가져오는 onChangeLike
	const onChangeLike = useCallback(() => {
		const latestLikeList = getLocalStorageItem<
			Record<string, number[] | string[]>
		>('likes', {});

		const latestLikerKey = getLikerKey({
			likeList: latestLikeList,
			user: userId,
			isLoggedIn,
		});

		if (latestLikerKey === null) {
			return;
		}
		const count = latestLikeList[latestLikerKey ?? '']?.length ?? 0;

		updateNotification(pageKey, count > 0, count);
	}, [pageKey]);

	return { onChangeLike, likeNotification };
};
