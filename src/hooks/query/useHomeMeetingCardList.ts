import { getMeetingInfiniteData } from '@/api/meeting/getMeetingDate';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useHomeMeetingCardList = () => {
	return useInfiniteQuery({
		queryKey: ['home-meetings-cardlist'],
		queryFn: ({ pageParam }) => getMeetingInfiniteData({ pageParam }),
		getNextPageParam: (lastPage) =>
			lastPage ? lastPage.nextOffset : undefined,
		initialPageParam: 21,
	});
};
