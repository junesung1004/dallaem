import { useAuthStore } from '@/store/useAuthStore';
import useNotificationStore from '@/store/useNotificationStore';
import { useCallback, useEffect } from 'react';
import { getLikerKey, getLocalStorageItem } from '@/utils/localStorage';
import type { ILikeListJSON } from '@/types/likeButtonType';

export const useLikeNotify = () => {
	const hasHydrated = useAuthStore((state) => state.hasHydrated);
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

	const likerKey = hasHydrated
		? getLikerKey({ likeList, user: userId, isLoggedIn })
		: null;

	useEffect(() => {
		if (!likerKey) return;

		const count = likeList[likerKey]?.length ?? 0;
		updateNotification(pageKey, count > 0, count);
	}, []);

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

	return { onChangeLike, likeNotification };
};
