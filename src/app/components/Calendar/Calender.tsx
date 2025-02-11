'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// react-datepicker 라이브러리 = 달력만 표기
export const Calender = () => {
	const [startDate, setStartDate] = useState(new Date());

	return (
		<DatePicker
			selected={startDate}
			onChange={(date) => setStartDate(date)}
			dateFormat='MMMM d, yyyy' // 날짜만 표시
			className='border border-gray-300 rounded-lg p-2'
		/>
	);
};
