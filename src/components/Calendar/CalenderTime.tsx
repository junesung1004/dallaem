'use client';

import { setHours, setMinutes } from 'date-fns';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CalenderPropsType {
	selectedDate?: Date | null;
	onDateChange?: (date: Date | null) => void;
}

// react-datepicker 라이브러리 = 달력 + 시간 표기
export const CalenderTime = ({
	selectedDate,
	onDateChange,
}: CalenderPropsType) => {
	const [startDate, setStartDate] = useState<Date | null>(
		selectedDate ?? setHours(setMinutes(new Date(), 30), 16),
	);

	return (
		<DatePicker
			selected={startDate}
			onChange={(date) => {
				setStartDate(date);
				if (onDateChange) {
					onDateChange(date); // 부모 컴포넌트에도 변경된 값 전달
				}
			}}
			timeIntervals={5} // 5분 단위로 조정
			showTimeSelect
			excludeTimes={[
				setHours(setMinutes(new Date(), 0), 17),
				setHours(setMinutes(new Date(), 30), 18),
				setHours(setMinutes(new Date(), 30), 19),
				setHours(setMinutes(new Date(), 30), 17),
			]}
			dateFormat='yyyy-MM-dd h:mm aa'
			showIcon
			className='border border-gray-300 rounded-lg p-2'
		/>
	);
};
