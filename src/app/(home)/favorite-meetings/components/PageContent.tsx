'use client';

import PageNavbar from '@/components/PageNav/PageNavbarCustom';
import CardList from './CardList';
import { useFilters } from '@/hooks/customs/useFilters';

function PageContent() {
	const { currentFilter, handleTypeHandler } = useFilters({
		type: 'DALLAEMFIT',
	});
	return (
		<>
			<PageNavbar
				pageKey='meetings'
				onMainClick={handleTypeHandler}
				onSubClick={handleTypeHandler}
			/>
			<div className='-mt-[1rem] border-t-2 border-solid border-gray-200'>
				<CardList currentFilter={currentFilter} />
			</div>
		</>
	);
}

export default PageContent;
