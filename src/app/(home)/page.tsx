import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import MainPage from './MainPage';
import { getMeetingInfiniteData } from '@/api/meeting/getMeetingDate';

export default async function Home() {
	const queryClient = new QueryClient();

	const filters = {
		type: 'DALLAEMFIT',
		location: '',
		date: '',
		sortBy: 'dateTime',
		sortOrder: 'asc',
	};

	await queryClient.prefetchInfiniteQuery({
		queryKey: ['home-meetings-cardlist', filters],
		queryFn: async () => {
			const data = await getMeetingInfiniteData({
				limit: 4,
				sortBy: 'dateTime',
				sortOrder: 'asc',
			});
			return {
				data: data.data,
				totalItemCount: data.totalItemCount,
				currentPage: data.currentPage,
				totalPages: data.totalPages,
			};
		},
		initialPageParam: 1,
	});
	const dehydratedState = dehydrate(queryClient);
	//console.log('dehydratedState : ', dehydratedState);
	return (
		<HydrationBoundary state={dehydratedState}>
			<MainPage />
		</HydrationBoundary>
	);
}
