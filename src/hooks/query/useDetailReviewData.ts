import { useQuery, UseQueryOptions } from '@tanstack/react-query';
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

type AdditionalOptions = Omit<
	UseQueryOptions<DetailReviewData, Error>,
	'queryKey' | 'queryFn' | 'enabled'
>;

export default function useDetailReviewData(
	{ gatheringId, limit, currentPage }: DetailReviewParams,
	options?: AdditionalOptions,
) {
	return useQuery<DetailReviewData>({
		queryKey: ['detailReview', gatheringId, currentPage],
		queryFn: () =>
			reviewService.getDetailReviewData({
				gatheringId,
				limit,
				currentPage,
			}),
		enabled: Boolean(gatheringId),
		...options,
	});
}
