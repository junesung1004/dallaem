import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import ReviewCard from '@/components/ReviewCard/ReviewCard';
import { ReviewType } from '@/types/paginationType';
import useFetchReviewsData from '@/hooks/query/useFetchReviewData';

function ReviewCardList() {
	const { data, fetchNextPage, hasNextPage } = useFetchReviewsData();
	const reviews: ReviewType[] = data?.pages.flatMap((page) => page.data) ?? [];
	const isReviewEmpty = reviews.length === 0;

	const { ref, inView } = useInView();

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage]);

	return (
		<div className='relative w-full h-full p-4 min-h-[400px]'>
			{isReviewEmpty ? (
				<div className='flex justify-center content-center text-gray-500'>
					아직 리뷰가 없어요
				</div>
			) : (
				<>
					{reviews.map((review: ReviewType, index) => (
						<ReviewCard key={review.id ?? `review-${index}`}>
							<ReviewCard.ImageSection
								src={review.Gathering.image || undefined}
							/>
							<ReviewCard.ReviewLayout>
								<ReviewCard.HeartScore score={review.score} />
								<ReviewCard.Content comment={review.comment} />
								<ReviewCard.EtcInfo
									userIcon={review.User.image || undefined}
									nickname={review.User.name}
									type={review.Gathering.type}
									location={review.Gathering.location}
									date={review.createdAt}
								/>
							</ReviewCard.ReviewLayout>
						</ReviewCard>
					))}
					{hasNextPage && <div ref={ref} />}
				</>
			)}
		</div>
	);
}

export default ReviewCardList;
