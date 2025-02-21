'use client';

import { useState, useEffect } from 'react';
import { FITERING_DATA } from '@/constants';
import FilterDropdown from '@/components/Filtering/Filter';
import CalenderFilter from '../Calendar/CalendarFilter';
import { useFilterStore } from '@/store/useInputSelectFilterStore';

interface FilterListProps {
	enabledFilters?: ('location' | 'date' | 'sortByMeeting' | 'sortByReview')[];
}

export default function FilterList({
	enabledFilters = ['location', 'date', 'sortByMeeting', 'sortByReview'],
}: FilterListProps) {
	const { selectedFilters, setSelectedFilters } = useFilterStore();

	const [selectedLocation, setSelectedLocation] = useState(
		selectedFilters.location || FITERING_DATA.location[0].value,
	);
	const [selectedDate, setSelectedDate] = useState<Date | null>(
		selectedFilters.date ? new Date(selectedFilters.date) : null,
	);
	const formattedDate = selectedDate?.toISOString().split('T')[0] ?? '';

	const initialSortBy = enabledFilters.includes('sortByReview')
		? FITERING_DATA.sortByReview[0].value
		: FITERING_DATA.sortByMeeting[0].value;

	const [selectedSortBy, setSelectedSortBy] = useState(
		selectedFilters.sortBy || initialSortBy,
	);

	const [selectedSortOrder, setSelectedSortOrder] = useState(
		selectedFilters.sortOrder || 'asc',
	);

	// 현재 열린 드롭다운 ID 관리 (하나만 열리도록)
	const [isOpenDropdown, setIsOpenDropdown] = useState<string | null>(null);

	const toggleDropdown = (dropdownId: string) => {
		setIsOpenDropdown((prev) => (prev === dropdownId ? null : dropdownId));
	};

	// 필터 값이 변경될 때 Zustand Store에 저장
	useEffect(() => {
		const updatedFilters = {
			location: enabledFilters.includes('location') ? selectedLocation : '',
			date: enabledFilters.includes('date') ? formattedDate : '',
			sortBy:
				enabledFilters.includes('sortByMeeting') ||
				enabledFilters.includes('sortByReview')
					? selectedSortBy
					: '',
			sortOrder:
				enabledFilters.includes('sortByMeeting') ||
				enabledFilters.includes('sortByReview')
					? selectedSortOrder
					: 'asc',
		};

		setSelectedFilters(updatedFilters);
	}, [selectedLocation, formattedDate, selectedSortBy, selectedSortOrder]);

	return (
		<div className='flex relative gap-2'>
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

			<div className='absolute right-0'>
				{/* 정렬 필터 (Meeting) */}
				{enabledFilters.includes('sortByMeeting') && (
					<FilterDropdown
						category='sortByMeeting'
						selected={selectedSortBy}
						sortOrder={selectedSortOrder as 'asc' | 'desc'}
						onSelect={(sortBy, sortOrder) => {
							setSelectedSortBy(sortBy);
							setSelectedSortOrder(sortOrder);
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
							setSelectedSortOrder(sortOrder);
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
