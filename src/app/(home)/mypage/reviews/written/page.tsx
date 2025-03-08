import ReviewCard from '@/components/ReviewCard/ReviewCard';
import { BASE_URL } from '@/constants';
import { reviewService } from '@/service/reviewService';
import type { IUser } from '@/types/userType';
import { cookies } from 'next/headers';

/** 모임 종류별 치환 */
const typeMap: {
	[x: string]: string;
} = {
	DALLAEMFIT: '달램핏',
	OFFICE_STRETCHING: '오피스 스트레칭',
	MINDFULNESS: '마인드풀니스 ',
	WORKATION: '워케이션',
};

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

	const { data: reviews } = await reviewService.getDetailReviewData({
		userId,
	});

	return (
		<div className='flex min-h-[380px] md:min-h-[688px] lg:min-h-[617px]'>
			<div>
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
		</div>
	);
}

export default Page;
