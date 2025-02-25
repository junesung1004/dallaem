import { useEffect, useState } from 'react';
import { getLikedStatus, saveLike, removeLike } from '../../lib/likeStorage';
import { useAuthStore } from '@/store/useAuthStore';
import { useLikeNotify } from './useLikeNotify';

export const useLike = (
	itemId: number,
	onLikeChangeHandler: (likeState: boolean) => void = () => {},
) => {
	const userId = useAuthStore((state) => state.userId);
	const [isLiked, setIsLiked] = useState<boolean>(false);
	const { onChangeLike } = useLikeNotify();

	useEffect(() => {
		const fetchLikeStatus = async () => {
			const status = await getLikedStatus(itemId, userId);
			setIsLiked(status);
		};

		fetchLikeStatus();
	}, [itemId, userId]);

	useEffect(() => {
		onLikeChangeHandler?.(isLiked);
	}, [isLiked]);

	const toggleLike = async () => {
		if (isLiked) {
			await removeLike(itemId, userId);
			setIsLiked(false);
		} else {
			await saveLike(itemId, userId);
			setIsLiked(true);
		}

		onChangeLike();
	};

	return { isLiked, toggleLike };
};
