'use client';

import FilterList from '@/components/Filtering/FIlterList';
import PageNavbar from '@/components/PageNav/PageNavbar';
import PageInfo from '@/components/PageInfo/PageInfo';
import ReviewCardList from './_components/ReviewCardList';
import ReviewSummary from './_components/ReviewSummary';
import FilterProvider from '@/context/FilterContent';

export default function ReviewsPage() {
	return (
		<FilterProvider defaultSortBy='createdAt'>
			<div className='flex flex-col gap-3 pb-4 border-b-2 border-gray-200 '>
				<PageInfo pageKey='reviews' />
				<PageNavbar pageKey='meetings' />
			</div>
			<div className='flex flex-col gap-4 pt-5 pb-2 sticky top-0 z-10 bg-gray-50'>
				<ReviewSummary />
				<FilterList enabledFilters={['location', 'date', 'sortByReview']} />
			</div>
			<div>
				<ReviewCardList />
			</div>
		</FilterProvider>
	);
}
