'use client';

import { useState, useEffect } from 'react';
import { FITERING_DATA } from '@/constants';
import CalenderFilter from '../Calendar/CalendarFilter';
import { useFilter } from '@/hooks/customs/useFilter';
import FilterDropdown from './FilterDropdown';

interface FilterListProps {
	enabledFilters?: ('location' | 'date' | 'sortByMeeting' | 'sortByReview')[];
}

function FilterList({
	enabledFilters = ['location', 'date', 'sortByMeeting', 'sortByReview'],
}: FilterListProps) {
	const {
		location,
		setLocation,
		date,
		setDate,
		sortBy,
		setSortBy,
		sortOrder,
		setSortOrder,
	} = useFilter();

	const [selectedLocation, setSelectedLocation] = useState(
		location || FITERING_DATA.location[0].value,
	);
	const [selectedDate, setSelectedDate] = useState<Date | null>(
		date ? new Date(date) : null,
	);
	const formattedDate = selectedDate
		? //('sv-SE')는 스웨덴 표준 날짜 형식,자체가 YYYY-MM-DD
			selectedDate.toLocaleDateString('sv-SE')
		: '';

	const initialSortBy = enabledFilters.includes('sortByReview')
		? FITERING_DATA.sortByReview[0].value
		: FITERING_DATA.sortByMeeting[0].value;

	const [selectedSortBy, setSelectedSortBy] = useState(sortBy || initialSortBy);
	const [selectedSortOrder, setSelectedSortOrder] = useState(
		sortOrder || 'desc',
	);

	// 현재 열린 드롭다운 ID 관리 (하나만 열리도록)
	const [isOpenDropdown, setIsOpenDropdown] = useState<string | null>(null);

	const toggleDropdown = (dropdownId: string) => {
		setIsOpenDropdown((prev) => (prev === dropdownId ? null : dropdownId));
	};

	useEffect(() => {
		// 상태를 Context API를 통해 동기화
		setLocation(enabledFilters.includes('location') ? selectedLocation : '');
		setDate(enabledFilters.includes('date') ? formattedDate : '');
		setSortBy(
			enabledFilters.includes('sortByMeeting') ||
				enabledFilters.includes('sortByReview')
				? selectedSortBy
				: '',
		);
		setSortOrder(
			enabledFilters.includes('sortByMeeting') ||
				enabledFilters.includes('sortByReview')
				? selectedSortOrder
				: 'desc',
		);
	}, [selectedLocation, selectedDate, selectedSortBy, selectedSortOrder]);

	return (
		<div className='flex gap-1 justify-between'>
			<div className='flex gap-1 md:gap-2'>
				{/* 지역 필터 */}
				{enabledFilters.includes('location') && (
					<FilterDropdown
						category='location'
						selected={selectedLocation}
						onSelect={setSelectedLocation}
						isOpen={isOpenDropdown === 'location'}
						onToggle={() => toggleDropdown('location')}
					/>
				)}

				{/* 날짜 필터 */}
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
			</div>

			<div>
				{/* 정렬 필터 (Meeting) */}
				{enabledFilters.includes('sortByMeeting') && (
					<FilterDropdown
						category='sortByMeeting'
						selected={selectedSortBy}
						sortOrder={selectedSortOrder as 'asc' | 'desc'}
						onSelect={(sortBy, sortOrder) => {
							setSelectedSortBy(sortBy);
							if (
								sortBy === 'registrationEnd' &&
								selectedSortBy !== 'registrationEnd'
							) {
								setSelectedSortOrder('asc');
							} else if (
								sortBy !== 'registrationEnd' &&
								selectedSortBy === 'registrationEnd'
							) {
								setSelectedSortOrder('desc');
							} else {
								setSelectedSortOrder(sortOrder);
							}
						}}
						variant='sort'
						isOpen={isOpenDropdown === 'sortByMeeting'}
						onToggle={() => toggleDropdown('sortByMeeting')}
					/>
				)}

				{/* 정렬 필터 (Review) */}
				{enabledFilters.includes('sortByReview') && (
					<FilterDropdown
						category='sortByReview'
						selected={selectedSortBy}
						sortOrder={selectedSortOrder as 'asc' | 'desc'}
						onSelect={(sortBy, sortOrder) => {
							setSelectedSortBy(sortBy);
							if (sortBy !== selectedSortBy) {
								setSelectedSortOrder('desc');
							} else {
								setSelectedSortOrder(sortOrder);
							}
						}}
						variant='sort'
						isOpen={isOpenDropdown === 'sortByReview'}
						onToggle={() => toggleDropdown('sortByReview')}
					/>
				)}
			</div>
		</div>
	);
}

export default FilterList;
