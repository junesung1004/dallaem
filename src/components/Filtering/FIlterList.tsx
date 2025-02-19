'use client';

import { useState } from 'react';
import { FITERING_DATA } from '@/constants';
import FilterDropdown from '@/components/Filtering/Filter';
import { CalenderImage } from '@/app/components/Calendar/CalenderImage';

interface FilterListProps {
	enabledFilters?: ('location' | 'date' | 'sortByMeeting' | 'sortByReview')[];
	initialFilters: {
		location?: string;
		date?: string;
		sortMeeting?: { sortBy: string; sortOrder: 'asc' | 'desc' };
		sortReview?: { sortBy: string; sortOrder: 'asc' | 'desc' };
	};
}

export default function FilterList({
	enabledFilters = ['location', 'date', 'sortByMeeting', 'sortByReview'],
	initialFilters,
}: FilterListProps) {
	const [selectedLocation, setSelectedLocation] = useState(
		initialFilters.location || '',
	);
	const [selectedDate, setSelectedDate] = useState<Date | null>(
		initialFilters.date ? new Date(initialFilters.date) : null,
	);
	const formattedDate = selectedDate?.toISOString().split('T')[0] ?? '';

	const [selectedSortMeeting, setSelectedSortMeeting] = useState(
		initialFilters.sortMeeting || {
			sortBy: FITERING_DATA.sortByMeeting[0].value,
			sortOrder: 'asc' as 'asc' | 'desc',
		},
	);
	const [selectedSortReview, setSelectedSortReview] = useState(
		initialFilters.sortReview || {
			sortBy: FITERING_DATA.sortByReview[0].value,
			sortOrder: 'asc' as 'asc' | 'desc',
		},
	);

	// 현재 열린 드롭다운 ID 관리 (하나만 열리도록)
	const [isOpenDropdown, setIsOpenDropdown] = useState<string | null>(null);

	// 드롭다운 토글 함수
	const toggleDropdown = (dropdownId: string) => {
		setIsOpenDropdown((prev) => (prev === dropdownId ? null : dropdownId));
	};

	return (
		<div className='flex relative gap-2'>
			{enabledFilters.includes('location') && (
				<FilterDropdown
					category='location'
					selected={selectedLocation}
					onSelect={setSelectedLocation}
					isOpen={isOpenDropdown === 'location'}
					onToggle={() => toggleDropdown('location')}
				/>
			)}

			{enabledFilters.includes('date') && (
				<FilterDropdown
					category='date'
					selected={formattedDate}
					onSelect={() => setSelectedDate(null)}
					isOpen={isOpenDropdown === 'date'}
					onToggle={() => toggleDropdown('date')}
					calendarComponent={
						<CalenderImage
							startDate={selectedDate}
							setStartDate={setSelectedDate}
							onApply={() => toggleDropdown('date')}
						/>
					}
				/>
			)}

			<div className='absolute right-0'>
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
