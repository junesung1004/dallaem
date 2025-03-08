'use client';

import FilterList from '@/components/Filtering/FIlterList';
import PageNavbar from '@/components/PageNav/PageNavbar';
import PageInfo from '@/components/PageInfo/PageInfo';
import ReviewCardList from './_components/ReviewCardList';
import ReviewSummary from './_components/ReviewSummary';
import { useFilters } from '@/hooks/customs/useFilters';

export default function ReviewsPage() {
	const { currentFilter, handleChangeFilter, handleTypeHandler } = useFilters({
		type: 'DALLAEMFIT',
		location: '',
		date: '',
		sortBy: 'createdAt',
		sortOrder: 'desc',
	});
	return (
		<div>
			<div className='flex flex-col gap-3 pb-4 border-b-2 border-gray-200 '>
				<PageInfo pageKey='reviews' />
				<PageNavbar
					pageKey='meetings'
					onMainClick={handleTypeHandler}
					onSubClick={handleTypeHandler}
					filter={currentFilter}
				/>
			</div>
			<div className='flex flex-col gap-4 pt-5 pb-2 sticky top-0 z-10 bg-gray-50'>
				<ReviewSummary />
				<FilterList
					enabledFilters={['location', 'date', 'sortByReview']}
					handleFilter={handleChangeFilter}
					filter={currentFilter}
				/>
			</div>
			<div>
				<ReviewCardList filters={currentFilter} />
			</div>
		</div>
	);
}
