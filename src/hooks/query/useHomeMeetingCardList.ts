import { getMeetingInfiniteData } from '@/api/meeting/getMeetingDate';
import { useInfiniteQuery } from '@tanstack/react-query';
// import { useFilter } from '../customs/useFilter';
import { FilterType } from '@/types/filterType';

// export const useHomeMeetingCardList = () => {
export const useHomeMeetingCardList = (curFilters: FilterType) => {
	// const filters = useFilter();

	return useInfiniteQuery({
		// queryKey: ['home-meetings-cardlist', filters],
		queryKey: ['home-meetings-cardlist', curFilters],
		// queryFn: ({ pageParam }) => getMeetingInfiniteData({ pageParam, filters }),
		queryFn: ({ pageParam }) =>
			getMeetingInfiniteData({ pageParam, filters: curFilters ?? {} }),
		getNextPageParam: (lastPage) =>
			lastPage ? lastPage.nextOffset : undefined,
		initialPageParam: 0,
	});
};
