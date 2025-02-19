'use client';

import FilterList from '@/components/Filtering/FIlterList';
import { useState } from 'react';

export default function AllReviews() {
	const [selectedFilters, setSelectedFilters] = useState({});

	return (
		<div>
			<FilterList
				enabledFilters={['location', 'date', 'sortByReview']} // 사용 가능한 필터 선택
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
