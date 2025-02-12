'use client';

import { setHours, setMinutes } from 'date-fns';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // 추가

// react-datepicker 라이브러리 = 달력 + 시간 표기
export const CalenderTime = () => {
	const [startDate, setStartDate] = useState<Date | null>(
		setHours(setMinutes(new Date(), 30), 16),
	);

	return (
		<DatePicker
			selected={startDate}
			onChange={(date) => setStartDate(date)}
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
