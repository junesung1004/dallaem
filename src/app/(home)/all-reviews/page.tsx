import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import ReviewsPage from './ReviewsPage';
import { reviewService } from '@/service/reviewService';

export default async function AllReviews() {
	const queryClient = new QueryClient();

	// 서버에서 초기 리뷰 데이터를 가져오기
	await queryClient.prefetchInfiniteQuery({
		queryKey: ['reviews', { page: 1 }],
		queryFn: async () => {
			const data = await reviewService.getDetailReviewData({
				currentPage: 1,
				limit: 4,
			});
			return {
				data: data.data,
				totalItemCount: data.totalItemCount,
				currentPage: 1,
				totalPages: data.totalPages,
			};
		},
		initialPageParam: 1,
	});

	// `dehydratedState`를 생성하여 클라이언트로 전달
	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<ReviewsPage />
		</HydrationBoundary>
	);
}
