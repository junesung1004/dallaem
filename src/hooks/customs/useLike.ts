import { useEffect, useState } from 'react';
import { getLikedStatus, saveLike, removeLike } from '../../lib/likeStorage';
import { useStore } from '@/store/useAuthStore';

export const useLike = (itemId: number) => {
	const userId = useStore((state) => state.userId);
	const [isLiked, setIsLiked] = useState<boolean>(false);

	useEffect(() => {
		const fetchLikeStatus = async () => {
			const status = await getLikedStatus(itemId, userId);
			setIsLiked(status);
		};

		fetchLikeStatus();
	}, [itemId, userId]);

	const toggleLike = async () => {
		if (isLiked) {
			await removeLike(itemId, userId);
			setIsLiked(false);
		} else {
			await saveLike(itemId, userId);
			setIsLiked(true);
		}
	};

	return { isLiked, toggleLike };
};
