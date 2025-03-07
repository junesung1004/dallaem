import { BASE_URL } from '@/constants';
import CardList from './components/CardList/CardList';
import { cookies } from 'next/headers';
import { MyMeeting } from '@/types/meetingsType';

async function MyPage() {
	const cookieStore = await cookies();
	const token = cookieStore.get('token');

	const res = await fetch(`${BASE_URL}/gatherings/joined/?sortBy=joinedAt`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token?.value}`,
		},
	});
	const initialMyMeetings: MyMeeting[] = await res?.json();

	return (
		<div className='flex min-h-[436px] md:min-h-[744px] lg:min-h-[832px]'>
			<CardList
				cardType='joined'
				pageKey='joined'
				initialData={initialMyMeetings}
			/>
		</div>
	);
}

export default MyPage;
