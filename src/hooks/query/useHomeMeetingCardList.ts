import { getMeetingInfiniteData } from '@/api/meeting/getMeetingDate';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FilterType } from '@/types/filterType';

export const useHomeMeetingCardList = (filters: FilterType) => {
	return useInfiniteQuery({
		queryKey: ['home-meetings-cardlist', filters],
		queryFn: ({ pageParam = 1 }) =>
			getMeetingInfiniteData({ pageParam, filters }),
		getNextPageParam: (lastPage) =>
			lastPage ? lastPage.nextOffset : undefined,
		initialPageParam: 1,
	});
};
