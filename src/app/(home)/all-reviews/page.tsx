import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import ReviewsPage from './ReviewsPage';
import { reviewService } from '@/service/reviewService';
import { IReviewInfiniteData } from '@/types/reviewType';

export default async function AllReviews() {
	//const queryClient = new QueryClient();
	// useFilter와 동일하게 설정
	// const filters = {
	// 	type: 'DALLAEMFIT',
	// 	location: '',
	// 	date: '',
	// 	sortBy: 'createdAt',
	// 	sortOrder: 'desc',
	// };

	const data = await reviewService.getDetailReviewData({
		limit: 5,
		type: 'DALLAEMFIT',
		sortBy: 'createdAt',
		sortOrder: 'desc',
	});

	const initialReviews: IReviewInfiniteData = data
		? {
				pages: [
					{
						data: data.data,
						totalItemCount: data.totalItemCount,
						currentPage: 1,
						totalPages: data.totalPages,
					},
				],
				pageParams: [1], //React Query가 페이지네이션을 인식하도록 설정
			}
		: undefined;

	// await queryClient.prefetchInfiniteQuery({
	// 	queryKey: ['reviews', filters],
	// 	queryFn: async () => {
	// 		const data = await reviewService.getDetailReviewData({
	// 			limit: 5,
	// 			sortBy: 'createdAt',
	// 			sortOrder: 'desc',
	// 		});
	// 		return {
	// 			data: data.data,
	// 			totalItemCount: data.totalItemCount,
	// 			currentPage: data.currentPage,
	// 			totalPages: data.totalPages,
	// 		};
	// 	},
	// 	initialPageParam: 1,
	// });

	//const dehydratedState = dehydrate(queryClient);
	return <ReviewsPage initialReviews={initialReviews} />;
}
