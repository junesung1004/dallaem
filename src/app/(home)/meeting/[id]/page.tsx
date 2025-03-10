import DetailPage from './DetailPage';
import ReviewPage from './ReviewPage';

import { getDetailMeetingData } from '@/api/detail-meeting/getDetailMeetingDate';

type Params = Promise<{ id: string }>;
export default async function Page({ params }: { params: Params }) {
	const { id } = await params;

	const detailData = await getDetailMeetingData(id);

	return (
		<div className='mb-5 min-h-screen'>
			<DetailPage detailData={detailData} />
			<ReviewPage />
		</div>
	);
}
