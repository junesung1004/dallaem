import DetailPage from './DetailPage';
import ReviewPage from './ReviewPage';

import { getDetailMeetingData } from '@/api/detail-meeting/getDetailMeetingDate';
import { reviewService } from '@/service/reviewService';

type Params = Promise<{ id: string }>;
export default async function Page({ params }: { params: Params }) {
	const { id } = await params;

	const detailData = await getDetailMeetingData(id);
	const reviewData = await reviewService.getDetailReviewData({
		gatheringId: id,
		currentPage: 1,
		limit: 4,
	});

	return (
		<div className='mb-5 min-h-screen'>
			<DetailPage detailData={detailData} />
			<ReviewPage initialReviews={reviewData} />
		</div>
	);
}
