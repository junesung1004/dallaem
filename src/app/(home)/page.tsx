import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import MainPage from './MainPage';
import { getMeetingInfiniteData } from '@/api/meeting/getMeetingDate';
import { FilterType } from '@/types/filterType';

export default async function Home() {
	const queryClient = new QueryClient();

	// 필터 설정
	const filters: FilterType = {
		type: 'DALLAEMFIT',
		location: '',
		date: '',
		sortBy: 'dateTime',
		sortOrder: 'desc',
	};

	// 프리페치: 첫 번째 페이지만 5개의 데이터 가져오기
	await queryClient.prefetchInfiniteQuery({
		queryKey: ['home-meetings-cardlist', filters],
		queryFn: async ({ pageParam = 1 }) => {
			const { data, nextOffset } = await getMeetingInfiniteData({
				pageParam,
				filters,
			});
			return { data, nextOffset };
		},
		initialPageParam: 1,
	});

	const dehydratedState = dehydrate(queryClient);
	//console.log('dehydratedState : ', dehydratedState);

	return (
		<HydrationBoundary state={dehydratedState}>
			<MainPage initialFilters={filters} />
		</HydrationBoundary>
	);
}
