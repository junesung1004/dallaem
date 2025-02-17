import { useEffect, useState } from 'react';
import { getLikedStatus, saveLike, removeLike } from '../../lib/likeStorage';

export const useLike = (itemId: number, userId?: number) => {
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
		} else {
			await saveLike(itemId, userId);
		}
		setIsLiked(!isLiked);
	};

	return { isLiked, toggleLike };
};
