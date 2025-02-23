import ReviewCard from '@/components/ReviewCard/ReviewCard';
import { ReviewType } from '@/types/paginationType';

function ReviewCardList({ reviews: reviews }: { reviews: ReviewType[] }) {
	const isReviewEmpty = reviews.length === 0;
	return (
		<div>
			{isReviewEmpty ? (
				<div className='flex w-full h-[40vh] justify-center items-center text-gray-500'>
					아직 리뷰가 없어요
				</div>
			) : (
				<>
					{reviews.map((review: ReviewType) => (
						<ReviewCard key={review.id}>
							<ReviewCard.ImageSection src={review.Gathering.image} />
							<ReviewCard.ReviewLayout>
								<ReviewCard.HeartScore score={review.score} />
								<ReviewCard.Content comment={review.comment} />
								<ReviewCard.EtcInfo
									userIcon={
										review.User.image ??
										'/images/profile/profiledefaultSmall.png'
									}
									nickname={review.User.name}
									type={review.Gathering.type}
									location={review.Gathering.location}
									date={review.createdAt}
								/>
							</ReviewCard.ReviewLayout>
						</ReviewCard>
					))}
				</>
			)}
		</div>
	);
}

export default ReviewCardList;
