import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import ReviewsPage from './ReviewsPage';
import { reviewService } from '@/service/reviewService';
import { FilterType } from '@/types/filterType';

export default async function AllReviews() {
	const queryClient = new QueryClient();

	const filters: FilterType = {
		type: 'DALLAEMFIT',
		location: '',
		date: '',
		sortBy: 'createdAt',
		sortOrder: 'desc',
	};

	await queryClient.prefetchInfiniteQuery({
		queryKey: ['reviews', filters],
		queryFn: async () => {
			const { type, sortBy, sortOrder } = filters;
			const data = await reviewService.getDetailReviewData({
				limit: 5,
				type,
				sortBy,
				sortOrder,
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
			<ReviewsPage initialFilters={filters} />
		</HydrationBoundary>
	);
}
