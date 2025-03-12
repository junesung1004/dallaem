import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import ReviewCard from '@/components/ReviewCard/ReviewCard';
import { ReviewType } from '@/types/paginationType';
import useFetchReviewsData from '@/hooks/query/useFetchReviewData';
import { FilterType } from '@/types/filterType';

function ReviewCardList({ filters }: { filters: FilterType }) {
	const { data, fetchNextPage, hasNextPage, isLoading } =
		useFetchReviewsData(filters);

	// 리뷰 키 값 중복 제거
	const reviews: ReviewType[] =
		data?.pages
			.flatMap((page) => page.data)
			.filter(
				(review, index, self) =>
					self.findIndex((r) => r.id === review.id) === index,
			) ?? [];
	const isReviewEmpty = reviews.length === 0;

	const { ref, inView } = useInView();

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage]);

	const Msg = ({ message }: { message: string }) => (
		<div className='flex justify-center items-center h-40 text-gray-500'>
			{message}
		</div>
	);

	return (
		<div className='w-full h-full p-4 min-h-[400px] justify-center'>
			{isLoading ? (
				<Msg message='로딩 중...' />
			) : isReviewEmpty ? (
				<Msg message='아직 리뷰가 없어요' />
			) : (
				<>
					{reviews.map((review: ReviewType) => (
						<ReviewCard key={review.id}>
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
