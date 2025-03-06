import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import ReviewsPage from './ReviewsPage';
import { reviewService } from '@/service/reviewService';

export default async function AllReviews() {
	const queryClient = new QueryClient();
	// useFilter와 동일하게 설정
	const filters = {
		type: 'DALLAEMFIT',
		location: '',
		date: '',
		sortBy: '',
		sortOrder: 'desc',
	};

	await queryClient.prefetchInfiniteQuery({
		queryKey: ['reviews', filters],
		queryFn: async () => {
			const data = await reviewService.getDetailReviewData({
				limit: 5,
				sortOrder: 'desc',
			});
			return {
				data: data.data,
				totalItemCount: data.totalItemCount,
				currentPage: data.currentPage,
				totalPages: data.totalPages,
			};
		},
		initialPageParam: 1,
	});

	const dehydratedState = dehydrate(queryClient);
	return (
		<HydrationBoundary state={dehydratedState}>
			<ReviewsPage />
		</HydrationBoundary>
	);
}
