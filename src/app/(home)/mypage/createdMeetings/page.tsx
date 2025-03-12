import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { MyMeeting } from '@/types/meetingsType';
import { myMeetingService } from '../components/CardList/Services/myMeetingService';
import CardList from '../components/CardList/CardList';

async function Page() {
	const cookieStore = await cookies();
	const token = cookieStore.get('token');
	if (!token) redirect('/login');

	let initialMyMeetings: MyMeeting[] = [];

	try {
		const meetings = await myMeetingService.getMyHostedMeetings({
			headers: {
				Authorization: `Bearer ${token?.value}`,
			},
		});

		initialMyMeetings = meetings ?? [];
	} catch (e) {
		const status = e;

		switch (status) {
			case 'INVALID_TOKEN':
			case 'UNAUTHORIZED':
				return redirect('/login');
			default:
				return redirect('/login');
		}
	}

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
