import { reviewService } from '@/service/reviewService';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect, useState } from 'react';
import type { IReview } from '@/types/reviewType';

export const useMyReviews = () => {
	const [reviews, setReviews] = useState<IReview['data']>([]);
	const userId = useAuthStore((state) => state.userId);

	const fetchMyReviews = async () => {
		/** user정보 없으면 서버요청 하지말고 return */
		if (!userId) {
			return setReviews([]);
		}
		const reviewData: { data: IReview['data'] } =
			await reviewService.getDetailReviewData({
				userId,
			});
		setReviews(reviewData?.data ?? []);
	};

	useEffect(() => {
		fetchMyReviews();
	}, []);

	return { reviews };
};
