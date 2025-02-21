'use client';

import FilterList from '@/components/Filtering/FIlterList';
import { useFilterStore } from '@/store/useInputSelectFilterStore';
import React, { useEffect } from 'react';

export default function HomeFilter() {
	const { selectedFilters, setSelectedFilters } = useFilterStore();

	useEffect(() => {
		//console.log('현재 필터 값:', selectedFilters);
	}, [selectedFilters]);

	return (
		<div>
			<FilterList
				// 사용 가능한 필터 선택
				enabledFilters={['location', 'date', 'sortByReview']}
				selectedFilters={selectedFilters}
				onFilterChange={(filters) => setSelectedFilters(filters)}
			/>
		</div>
	);
}
