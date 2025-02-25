'use client';

import FilterList from '@/components/Filtering/FIlterList';
import { useFilter } from '@/hooks/customs/useFilter';
//import { useFilterStore } from '@/store/useInputSelectFilterStore';
import React, { useEffect } from 'react';

export default function HomeFilter() {
	//const { selectedFilters } = useFilterStore();
	const { type, location, date, sortBy, sortOrder } = useFilter();

	useEffect(() => {
		console.log('현재 필터 값:', type, location, date, sortBy, sortOrder);
	}, [type, location, date, sortBy, sortOrder]);

	return (
		<div>
			<FilterList
				// 사용 가능한 필터 선택
				enabledFilters={['location', 'date', 'sortByMeeting']}
			/>
		</div>
	);
}
