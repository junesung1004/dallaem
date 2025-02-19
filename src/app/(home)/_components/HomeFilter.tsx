'use client';

import FilterList from '@/components/Filtering/FIlterList';
import { useFilterStore } from '@/store/useInputSelectFilterStore';
import React, { useEffect } from 'react';

export default function HomeFilter() {
	const { selectedFilters, setSelectedFilters } = useFilterStore();

	//useEffect로 selectedFilters 지긤 선택되고 있는 필터의 값을 확인할 수 있습니다!
	useEffect(() => {
		console.log('현재 필터 값:', selectedFilters);
	}, [selectedFilters]);

	return (
		<div>
			<FilterList
				// 사용 가능한 필터 선택
				enabledFilters={['location', 'date', 'sortByReview']}
				selectedFilters={selectedFilters}
				onFilterChange={(filters) =>
					setSelectedFilters({
						location: filters.location || '',
						date: filters.date || '',
						sortReview: filters.sortReview || {
							sortBy: 'createdAt',
							sortOrder: 'asc',
						},
					})
				}
			/>
		</div>
	);
}
