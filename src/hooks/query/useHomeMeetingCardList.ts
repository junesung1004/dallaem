import { getMeetingInfiniteData } from '@/api/meeting/getMeetingDate';
import { useInfiniteQuery } from '@tanstack/react-query';
// import { useFilter } from '../customs/useFilter';
import { FilterContextType } from '@/types/filterType';

// export const useHomeMeetingCardList = () => {
export const useHomeMeetingCardList = (
	curFilters: Pick<
		FilterContextType,
		'type' | 'location' | 'date' | 'sortBy' | 'sortOrder'
	> | null,
) => {
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
