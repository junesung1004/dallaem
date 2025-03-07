import DetailPage from './DetailPage';
import ReviewPage from './ReviewPage';
import { getDetailMeetingData } from '@/api/detail-meeting/getDetailMeetingDate';

export default async function MeetingPage({
	params,
}: {
	params: { id: string };
}) {
	const { id } = params;

	const detailData = await getDetailMeetingData(id);

	return (
		<div className='mb-5 min-h-screen'>
			<DetailPage detailData={detailData} />
			<ReviewPage />
		</div>
	);
}
