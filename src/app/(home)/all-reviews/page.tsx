'use client';
import { useState } from 'react';
import { FITERING_DATA } from '@/constants';
import FilterDropdown from '@/components/Filtering/Filter';

function AllReviews() {
	const [selectedLocation, setSelectedLocation] = useState(
		FITERING_DATA.location[0].value,
	);
	const [selectedDate, setSelectedDate] = useState(FITERING_DATA.date[0].value);

	const [selectedSortMeeting, setSelectedSortMeeting] = useState({
		sortBy: FITERING_DATA.sortByMeeting[0].value,
		sortOrder: 'asc' as 'asc' | 'desc',
	});
	const [selectedSortReview, setSelectedSortReview] = useState({
		sortBy: FITERING_DATA.sortByReview[0].value,
		sortOrder: 'asc' as 'asc' | 'desc',
	});

	const CalendarComponent = () => (
		<div className='p-4 border border-gray-200 rounded-lg shadow-md whitespace-nowrap'>
			📅
		</div>
	);

	return (
		<div className='flex gap-4 p-4'>
			{/* 지역 필터 */}
			<FilterDropdown
				category='location'
				selected={selectedLocation}
				onSelect={setSelectedLocation}
			/>

			{/* 날짜 필터 */}
			<FilterDropdown
				category='date'
				selected={selectedDate}
				onSelect={setSelectedDate}
				calendarComponent={<CalendarComponent />}
			/>

			{/* 모임 정렬 필터 */}
			<FilterDropdown
				category='sortByMeeting'
				selected={selectedSortMeeting.sortBy}
				sortOrder={selectedSortMeeting.sortOrder}
				onSelect={(sortBy, sortOrder) =>
					setSelectedSortMeeting({ sortBy, sortOrder })
				}
				variant='sort'
			/>

			{/* 리뷰 정렬 필터 */}
			<FilterDropdown
				category='sortByReview'
				selected={selectedSortReview.sortBy}
				sortOrder={selectedSortReview.sortOrder}
				onSelect={(sortBy, sortOrder) =>
					setSelectedSortReview({ sortBy, sortOrder })
				}
				variant='sort'
			/>
		</div>
	);
}

export default AllReviews;
