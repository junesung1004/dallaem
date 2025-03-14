import { getMeetingInfiniteData } from '@/api/meeting/getMeetingDate';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useFilter } from '../customs/useFilter';

export const useHomeMeetingCardList = () => {
	const filters = useFilter();

	return useInfiniteQuery({
		queryKey: ['home-meetings-cardlist', filters],
		queryFn: ({ pageParam }) => getMeetingInfiniteData({ pageParam, filters }),
		getNextPageParam: (lastPage) =>
			lastPage ? lastPage.nextOffset : undefined,
		initialPageParam: 0,
	});
};
