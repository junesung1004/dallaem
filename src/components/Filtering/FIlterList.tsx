'use client';

import { useState, useEffect } from 'react';
import { FITERING_DATA } from '@/constants';
import FilterDropdown from '@/components/Filtering/Filter';
import CalenderFilter from '../Calendar/CalendarFilter';

interface FilterListProps {
	enabledFilters?: ('location' | 'date' | 'sortByMeeting' | 'sortByReview')[];
	selectedFilters: {
		location?: string;
		date?: string;
		sortMeeting?: { sortBy: string; sortOrder: 'asc' | 'desc' };
		sortReview?: { sortBy: string; sortOrder: 'asc' | 'desc' };
	};
	onFilterChange: (filters: {
		location?: string;
		date?: string;
		sortMeeting?: { sortBy: string; sortOrder: 'asc' | 'desc' };
		sortReview?: { sortBy: string; sortOrder: 'asc' | 'desc' };
	}) => void;
}

export default function FilterList({
	enabledFilters = ['location', 'date', 'sortByMeeting', 'sortByReview'],
	selectedFilters,
	onFilterChange,
}: FilterListProps) {
	const [selectedLocation, setSelectedLocation] = useState(
		selectedFilters.location || FITERING_DATA.location[0].value,
	);
	const [selectedDate, setSelectedDate] = useState<Date | null>(
		selectedFilters.date ? new Date(selectedFilters.date) : null,
	);
	const formattedDate = selectedDate?.toISOString().split('T')[0] ?? '';

	const [selectedSortMeeting, setSelectedSortMeeting] = useState(
		selectedFilters.sortMeeting || {
			sortBy: FITERING_DATA.sortByMeeting[0].value,
			sortOrder: 'asc' as 'asc' | 'desc',
		},
	);
	const [selectedSortReview, setSelectedSortReview] = useState(
		selectedFilters.sortReview || {
			sortBy: FITERING_DATA.sortByReview[0].value,
			sortOrder: 'asc' as 'asc' | 'desc',
		},
	);

	// ✅ 현재 열린 드롭다운 ID 관리 (하나만 열리도록)
	const [isOpenDropdown, setIsOpenDropdown] = useState<string | null>(null);

	// ✅ 드롭다운 토글 함수
	const toggleDropdown = (dropdownId: string) => {
		setIsOpenDropdown((prev) => (prev === dropdownId ? null : dropdownId));
	};

	// ✅ 필터 값이 변경될 때 부모에 전달
	useEffect(() => {
		onFilterChange({
			location: enabledFilters.includes('location')
				? selectedLocation
				: undefined,
			date: enabledFilters.includes('date') ? formattedDate : undefined,
			sortMeeting: enabledFilters.includes('sortByMeeting')
				? selectedSortMeeting
				: undefined,
			sortReview: enabledFilters.includes('sortByReview')
				? selectedSortReview
				: undefined,
		});
	}, [
		selectedLocation,
		formattedDate,
		selectedSortMeeting,
		selectedSortReview,
	]);

	return (
		<div className='flex relative gap-2'>
			{/* ✅ 지역 필터 */}
			{enabledFilters.includes('location') && (
				<FilterDropdown
					category='location'
					selected={selectedLocation}
					onSelect={setSelectedLocation}
					isOpen={isOpenDropdown === 'location'}
					onToggle={() => toggleDropdown('location')}
				/>
			)}

			{/* ✅ 날짜 필터 */}
			{enabledFilters.includes('date') && (
				<FilterDropdown
					category='date'
					selected={formattedDate}
					onSelect={() => setSelectedDate(null)}
					isOpen={isOpenDropdown === 'date'}
					onToggle={() => toggleDropdown('date')}
					calendarComponent={
						<CalenderFilter
							meetingDate={selectedDate}
							setMeetingDate={setSelectedDate}
							onApply={() => toggleDropdown('date')}
						/>
					}
				/>
			)}

			<div className='absolute right-0'>
				{/* ✅ 모임 정렬 필터 */}
				{enabledFilters.includes('sortByMeeting') && (
					<FilterDropdown
						category='sortByMeeting'
						selected={selectedSortMeeting.sortBy}
						sortOrder={selectedSortMeeting.sortOrder}
						onSelect={(sortBy, sortOrder) =>
							setSelectedSortMeeting({ sortBy, sortOrder })
						}
						variant='sort'
						isOpen={isOpenDropdown === 'sortByMeeting'}
						onToggle={() => toggleDropdown('sortByMeeting')}
					/>
				)}

				{/* ✅ 리뷰 정렬 필터 */}
				{enabledFilters.includes('sortByReview') && (
					<FilterDropdown
						category='sortByReview'
						selected={selectedSortReview.sortBy}
						sortOrder={selectedSortReview.sortOrder}
						onSelect={(sortBy, sortOrder) =>
							setSelectedSortReview({ sortBy, sortOrder })
						}
						variant='sort'
						isOpen={isOpenDropdown === 'sortByReview'}
						onToggle={() => toggleDropdown('sortByReview')}
					/>
				)}
			</div>
		</div>
	);
}
