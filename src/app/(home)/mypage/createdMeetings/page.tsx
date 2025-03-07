import { cookies } from 'next/headers';
import CardList from '../components/CardList/CardList';
import { BASE_URL } from '@/constants';
import type { MyMeeting } from '@/types/meetingsType';
import { IUser } from '@/types/userType';

async function Page() {
	const cookieStore = await cookies();
	const token = cookieStore.get('token');

	const userInfoRes = await fetch(`${BASE_URL}/auths/user`, {
		headers: {
			Authorization: `Bearer ${token?.value}`,
		},
	});

	if (!userInfoRes?.ok) return new Error('invalid token');
	const userInfo: IUser = await userInfoRes.json();
	const userId = userInfo.id;

	const res = await fetch(`${BASE_URL}/gatherings/?createdBy=${userId}`, {
		method: 'GET',
		cache: 'no-store',
	});

	const initialMyMeetings: MyMeeting[] = await res?.json();

	return (
		<div className='flex min-h-[436px] md:min-h-[744px] lg:min-h-[673px]'>
			<CardList
				cardType='hosted'
				pageKey='hosted'
				initialData={initialMyMeetings}
			/>
		</div>
	);
}

export default Page;
