'use client';

import ReviewCard from '@/components/ReviewCard/ReviewCard';
import { useMyReviews } from '@/hooks/customs/useMyReviews';
import { IReview } from '@/types/reviewType';

/** 모임 종류별 치환 */
const typeMap: {
	[x: string]: string;
} = {
	DALLAEMFIT: '달램핏',
	OFFICE_STRETCHING: '오피스 스트레칭',
	MINDFULNESS: '마인드풀니스 ',
	WORKATION: '워케이션',
};

function Page() {
	const { reviews }: { reviews?: IReview['data'] } = useMyReviews();
	return (
		<div>
			{reviews?.map((review) => (
				<ReviewCard key={review.id}>
					<ReviewCard.ImageSection src={review.Gathering.image} />
					<ReviewCard.ReviewLayout>
						<ReviewCard.HeartScore score={5} />
						<ReviewCard.Content comment={review.comment} />
						<ReviewCard.EtcInfo
							type={typeMap[review.Gathering.type] ?? ''}
							location={review.Gathering.location}
							date={review.Gathering.dateTime}
						/>
					</ReviewCard.ReviewLayout>
				</ReviewCard>
			))}
		</div>
	);
}

export default Page;
