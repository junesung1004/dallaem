'use client';

import FilterList from '@/components/Filtering/FIlterList';
import PageNavbar from '@/components/PageNav/PageNavbar';
import PageInfo from '@/components/PageInfo/PageInfo';
import { useFetchReviews } from '@/hooks/customs/useFetchReviews';
import ReviewCardList from './_components/ReviewCardList';
import useFetchReviewScores from '@/hooks/query/useFetchReviewsScore';
import ReviewSummary from './_components/ReviewSummary';
import FilterProvider from '@/context/FilterContent';

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
	const reviews = useFetchReviews();
	const reviewsScore = useFetchReviewScores({ gatheringId: '' });

	return (
		<>
			<div className='flex flex-col gap-3 pb-4 border-b-2 border-gray-200 '>
				<PageInfo pageKey='reviews' />
				<PageNavbar pageKey='meetings' />
			</div>
			{reviewsScore && <ReviewSummary reviewScore={reviewsScore} />}
			<div className='flex flex-col gap-4 p-4 bg-white border-t-2 border-gray-900'>
				<FilterList enabledFilters={['location', 'date', 'sortByReview']} />
				<ReviewCardList reviews={reviews} />
			</div>
		</>
	);
}
