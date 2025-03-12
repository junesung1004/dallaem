import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserInfo } from '@/api/users';
import type { IReview } from '@/types/reviewType';
import { reviewService } from '@/service/reviewService';
import CardList from './components/CardList';

async function Page() {
	const cookieStore = await cookies();
	const token = cookieStore.get('token');

	if (!token) redirect('/login');

	const userInfo = await getUserInfo({
		headers: {
			Authorization: `Bearer ${token?.value}`,
		},
	});

	if (!userInfo) redirect('/login');
	const userId = userInfo.id;

	const { data } = await reviewService.getDetailReviewData({
		userId,
	});

	const reviews: IReview['data'] = data ?? [];

	return (
		<div className='flex min-h-[436px] md:min-h-[744px] lg:min-h-[832px]'>
			<CardList pageKey='reviewed' initialData={reviews} />
		</div>
	);
}

export default Page;
