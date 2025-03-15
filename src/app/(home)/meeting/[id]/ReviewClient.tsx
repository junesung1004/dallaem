'use client';

import { useState } from 'react';
import { Pagination } from '../_components/Pagination';
import { useParams } from 'next/navigation';
import useDetailReviewData from '@/hooks/query/useDetailReviewData';
import { ReviewInitialData } from '@/types/paginationType';
import ReviewCard from '@/components/ReviewCard/ReviewCard';

export default function ReviewClient({
	initialReviews,
}: {
	initialReviews: ReviewInitialData;
}) {
	const [currentPage, setCurrentPage] = useState(1);
	const params = useParams();
	const id = params.id as string;
	const limit = 4;

	const queryOptions =
		currentPage === 1
			? {
					initialData: {
						data: initialReviews.data,
						totalItemCount: initialReviews.totalItemCount,
						totalPages: initialReviews.totalPages,
					},
				}
			: undefined;

	const {
		data: reviewData,
		isLoading: isReviewLoading,
		isError: isReviewError,
		error: reviewError,
	} = useDetailReviewData(
		{ gatheringId: id, limit, currentPage },
		queryOptions,
	);

	const reviews = reviewData?.data || [];
	const totalPages = Math.ceil((reviewData?.totalItemCount || 0) / limit);

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	return (
		<div className='border-t-2 border-gray-300 mt-10 p-5 h-screen bg-white'>
			<div className='mb-4 font-bold text-lg'>
				이용자들은 이 프로그램을 이렇게 느꼈어요!!
			</div>

			{isReviewLoading ? (
				<div className='text-center text-gray-500 mt-60'>
					리뷰를 불러오는 중...
				</div>
			) : isReviewError ? (
				<div className='text-center text-gray-500 mt-60'>
					리뷰를 불러오는 데 실패했습니다:{' '}
					{reviewError instanceof Error ? reviewError.message : 'Unknown Error'}
				</div>
			) : reviews.length === 0 ? (
				<div className='text-center text-gray-500 mt-60'>
					아직 작성된 리뷰가 없어요
				</div>
			) : (
				<>
					<ul>
						{reviews.map((review) => (
							<ReviewCard key={review.id} isDetailPage={true}>
								<ReviewCard.ReviewLayout isDetailPage={true}>
									<ReviewCard.HeartScore score={review.score} />
									<ReviewCard.Content comment={review.comment} />
									<ReviewCard.EtcInfo
										userIcon={review.Gathering.image}
										nickname={review.User.name}
										date={review.Gathering.dateTime}
									/>
								</ReviewCard.ReviewLayout>
							</ReviewCard>
						))}
					</ul>

					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</>
			)}
		</div>
	);
}
