import { getMeetingInfiniteData } from '@/api/meeting/getMeetingDate';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useFilter } from '../customs/useFilter';

export const useHomeMeetingCardList = () => {
	const filters = useFilter();

	return useInfiniteQuery({
		queryKey: ['home-meetings-cardlist', filters],
		queryFn: async ({ pageParam = 1 }) => {
			const params = new URLSearchParams();
			if (filters.type) params.append('type', filters.type);
			if (filters.location) params.append('location', filters.location);
			if (filters.date) params.append('date', filters.date);
			if (filters.sortBy) params.append('sortBy', filters.sortBy);
			if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

			const response = await getMeetingInfiniteData({
				currentPage: pageParam,
				limit: 4,
				...Object.fromEntries(params),
			});

			console.log('API response:', response);

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
		getNextPageParam: (lastPage, allPages) => {
			const nextPage = lastPage.currentPage + 1;

			return nextPage <= lastPage.totalPages &&
				!allPages.some((p) => p.currentPage === nextPage)
				? nextPage
				: undefined;
		},
		initialPageParam: 1,
	});
};
