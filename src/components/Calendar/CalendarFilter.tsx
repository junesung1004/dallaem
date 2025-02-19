'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CalendarFilterProps {
	meetingDate: Date | null;
	setMeetingDate: (date: Date | null) => void;
	onApply: () => void; //적용 버튼 클릭 시 드롭다운 닫는 함수 추가
}

const CalendarFilter = ({
	meetingDate,
	setMeetingDate,
	onApply,
}: CalendarFilterProps) => {
	const [tempDate, setTempDate] = useState<Date | null>(meetingDate);

	const handleReset = () => {
		setTempDate(null);
	};

	const handleApply = () => {
		setMeetingDate(tempDate);
		onApply();
	};

	return (
		<div className='relative p-2 bg-white rounded-lg shadow-lg'>
			<DatePicker
				selected={tempDate}
				onChange={(date) => setTempDate(date)}
				inline
			/>
			<div className='flex justify-between mt-2'>
				{/* 예지님 버튼으로 바꿀 예정 */}
				<button
					onClick={handleReset}
					className='px-4 py-2 bg-orange-500 text-white rounded w-1/2 mr-1'
				>
					초기화
				</button>
				<button
					onClick={handleApply}
					className='px-4 py-2 bg-orange-500 text-white rounded w-1/2'
				>
					적용
				</button>
			</div>
		</div>
	);
};

export default CalendarFilter;
