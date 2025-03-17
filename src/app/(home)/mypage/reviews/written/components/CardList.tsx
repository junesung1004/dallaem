'use client';

import ReviewCard from '@/components/ReviewCard/ReviewCard';
import { myMeetingService } from '../../../components/CardList/Services/myMeetingService';
import {
	useSuspenseQuery,
	UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { IReviewData } from '@/types/reviewType';

/** 모임 종류별 치환 */
const typeMap: {
	[x: string]: string;
} = {
	DALLAEMFIT: '심리지원',
	OFFICE_STRETCHING: '상담 프로그램',
	MINDFULNESS: '마음의 캔버스',
	WORKATION: '마음쉼터',
};

function CardList({
	pageKey,
	initialData,
}: {
	pageKey: 'reviewed';
	initialData?: IReviewData[] | null;
}) {
	let authToken = null;
	if (typeof window !== 'undefined') {
		// 브라우저 환경에서만 실행
		authToken = localStorage.getItem('authToken') ?? ''; // 값이 없으면 빈 문자열로 보내기
	}

	const queryFunction = () => {
		const queryFunc = myMeetingService.getMyReviews;
		if (!queryFunc) return null;

		return queryFunc({
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		});
	};

	const queryOptions: UseSuspenseQueryOptions<IReviewData[] | null> = {
		queryKey: ['mypage', pageKey],
		queryFn: queryFunction,
		initialData,
	};

	// 클라이언트 fetch
	const { data } = useSuspenseQuery<IReviewData[] | null>(queryOptions);
	// const data = initialData;
	/** 데이터 없을 경우 처리 */
	if (!data?.length) {
		return (
			<div className='flex justify-center items-center mx-auto my-auto'>
				<span>작성한 리뷰가 아직 없어요</span>
			</div>
		);
	}

	const reviews = data ?? [];
	return (
		<div className='pt-4'>
			{reviews?.map((review) => (
				<ReviewCard key={review.id}>
					<ReviewCard.ImageSection src={review.Gathering.image} />
					<ReviewCard.ReviewLayout>
						<ReviewCard.HeartScore score={review.score} />
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

export default CardList;
