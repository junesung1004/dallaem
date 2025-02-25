'use client';

import FilterList from '@/components/Filtering/FIlterList';

export default function HomeFilter() {
	return (
		<div>
			<FilterList
				// 사용 가능한 필터 선택
				enabledFilters={['location', 'date', 'sortByMeeting']}
			/>
		</div>
	);
}
