import { useQuery } from '@tanstack/react-query';
import { reviewService } from '@/service/reviewService';
import { ReviewType } from '@/types/paginationType';

interface DetailReviewParams {
	gatheringId: string;
	limit: number;
	currentPage: number;
}

export interface DetailReviewData {
	data: ReviewType[];
	totalItemCount: number;
}

export default function useDetailReviewData({
	gatheringId,
	limit,
	currentPage,
}: DetailReviewParams) {
	return useQuery<DetailReviewData>({
		queryKey: ['detailReview', gatheringId, currentPage],
		queryFn: () =>
			reviewService.getDetailReviewData({
				gatheringId,
				limit,
				currentPage,
			}),
		enabled: Boolean(gatheringId),
	});
}
