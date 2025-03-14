'use client';

import FilterList from '@/components/Filtering/FIlterList';
import PageNavbar from '@/components/PageNav/PageNavbar';
import PageInfo from '@/components/PageInfo/PageInfo';
import ReviewCardList from './_components/ReviewCardList';
import useFetchReviewScores from '@/hooks/query/useFetchReviewsScore';
import ReviewSummary from './_components/ReviewSummary';
import FilterProvider from '@/context/FilterContent';
import { useFetchReviewsData } from '@/hooks/query/useFetchReviewData';
import { Datum } from '@/types/reviewType';

export default function AllReviews() {
	return (
		<div className='flex flex-col gap-6'>
			<FilterProvider>
				<ReviewsSection />
			</FilterProvider>
		</div>
	);
}

function ReviewsSection() {
	const { data: reviews = [] } = useFetchReviewsData();

	const gatheringIdList = [
		...new Set(
			reviews
				.map((review: Datum) => review.Gathering.id)
				.filter((id: number) => typeof id === 'number'),
		),
	].join(',');

	const reviewsScore = useFetchReviewScores({ gatheringId: gatheringIdList });

	return (
		<>
			<div className='flex flex-col gap-3 pb-4 border-b-2 border-gray-200 '>
				<PageInfo pageKey='reviews' />
				<PageNavbar pageKey='meetings' />
			</div>
			{reviewsScore && reviews.length > 0 ? (
				<ReviewSummary reviewScore={reviewsScore} />
			) : (
				<ReviewSummary reviewScore={null} />
			)}
			<div className='flex flex-col gap-4 p-4 bg-white border-t-2 border-gray-900'>
				<FilterList enabledFilters={['location', 'date', 'sortByReview']} />
				{reviews && <ReviewCardList reviews={reviews} />}
			</div>
		</>
	);
}
