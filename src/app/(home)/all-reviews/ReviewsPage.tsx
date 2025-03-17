'use client';

import FilterList from '@/components/Filtering/FIlterListCustom';
import PageNavbar from '@/components/PageNav/PageNavbarCustom';
import PageInfo from '@/components/PageInfo/PageInfo';
import ReviewCardList from './_components/ReviewCardList';
import ReviewSummary from './_components/ReviewSummary';
import { useFilters } from '@/hooks/customs/useFilters';
import { FilterType } from '@/types/filterType';

export default function ReviewsPage({
	initialFilters,
}: {
	initialFilters: FilterType;
}) {
	const { currentFilter, handleChangeFilter, handleTypeHandler } =
		useFilters(initialFilters);

	return (
		<>
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
				<ReviewSummary filters={currentFilter} />
				<FilterList
					enabledFilters={['location', 'date', 'sortByReview']}
					handleFilter={handleChangeFilter}
					filter={currentFilter}
				/>
			</div>
			<div>
				<ReviewCardList filters={currentFilter} />
			</div>
		</>
	);
}
