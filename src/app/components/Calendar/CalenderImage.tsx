'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// react-datepicker 라이브러리 = 달력만 표기~
export const CalenderImage = () => {
	const [startDate, setStartDate] = useState<Date | null>(new Date());

	return (
		<DatePicker
			selected={startDate}
			onChange={(date) => setStartDate(date)}
			inline
		/>
	);
};
