import { reviewService } from '@/service/reviewService';
import { useStore as useAuthStore } from '@/store/useAuthStore';
import { useEffect, useState } from 'react';
import type { IReview } from '@/types/reviewType';

export const useMyReviews = () => {
	const [reviews, setReviews] = useState<IReview['data']>();
	const userId = useAuthStore((state) => state.userId);

	const fetchMyReviews = async () => {
		const reviewData: { data: IReview['data'] } =
			await reviewService.getDetailReviewData({
				userId: userId ?? undefined,
			});
		setReviews(reviewData?.data ?? []);
	};

	useEffect(() => {
		fetchMyReviews();
	}, []);

	return { reviews };
};
