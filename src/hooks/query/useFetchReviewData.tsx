import { useInfiniteQuery } from '@tanstack/react-query';
import { reviewService } from '@/service/reviewService';
import { useFilter } from '../customs/useFilter';
import { IReviewInfiniteData } from '@/types/reviewType';

function useFetchReviewsData(initialReviews: IReviewInfiniteData) {
	const filters = useFilter();

	return useInfiniteQuery({
		queryKey: ['reviews', filters],
		queryFn: ({ pageParam = 1 }) => {
			const params = new URLSearchParams();
			if (filters.type) params.append('type', filters.type);
			if (filters.location) params.append('location', filters.location);
			if (filters.date) params.append('date', filters.date);
			if (filters.sortBy) params.append('sortBy', filters.sortBy);
			if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

			return reviewService.getDetailReviewData({
				limit: 4,
				currentPage: pageParam as number,
				...Object.fromEntries(params),
			});
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			const nextPage = lastPage.currentPage + 1;
			return nextPage <= lastPage.totalPages &&
				!allPages.some((p) => p.currentPage === nextPage)
				? nextPage
				: undefined;
		},
		enabled: !!true,
		initialData: initialReviews,
	});
}

export default useFetchReviewsData;
