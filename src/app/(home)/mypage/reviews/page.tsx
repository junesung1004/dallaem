import CardList from '../components/CardList/CardList';
import { cookies } from 'next/headers';
import { myMeetingService } from '../components/CardList/Services/myMeetingService';
import { redirect } from 'next/navigation';

async function Page() {
	const cookieStore = await cookies();
	const token = cookieStore.get('token');
	if (!token) redirect('/login');

	let initialMyMeetings: MyMeeting[] = [];

	try {
		const meetings = await myMeetingService.getMyCompletedMeetings({
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
		<div className='flex min-h-[380px] md:min-h-[688px] lg:min-h-[617px]'>
			<CardList cardType='joined' pageKey='review' />
		</div>
	);
}

export default Page;
