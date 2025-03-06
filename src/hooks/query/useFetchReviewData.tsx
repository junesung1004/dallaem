import { useInfiniteQuery } from '@tanstack/react-query';
import { reviewService } from '@/service/reviewService';
import { useFilter } from '../customs/useFilter';

function useFetchReviewsData() {
	const filters = useFilter();

	return useInfiniteQuery({
		queryKey: ['reviews', filters],
		queryFn: async () => {
			const params = new URLSearchParams();
			if (filters.type) params.append('type', filters.type);
			if (filters.location) params.append('location', filters.location);
			if (filters.date) params.append('date', filters.date);
			if (filters.sortBy) params.append('sortBy', filters.sortBy);
			if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

			const response = await reviewService.getDetailReviewData({
				limit: 4,
				...Object.fromEntries(params),
			});

			if (!response || !response.data) {
				throw new Error('API에서 데이터를 가져오지 못했습니다.');
			}

			return {
				data: response.data,
				totalItemCount: response.totalItemCount,
				currentPage: response.currentPage,
				totalPages: response.totalPages,
			};
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			const nextPage = lastPage.currentPage + 1;

			return nextPage <= lastPage.totalPages &&
				!allPages.some((p) => p.currentPage === nextPage)
				? nextPage
				: undefined;
		},
		enabled: !!filters,
	});
}

export default useFetchReviewsData;
