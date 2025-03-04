import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../Button/Button';

interface CalendarFilterProps {
	meetingDate: Date | null;
	setMeetingDate: (date: Date | null) => void;
	onApply: () => void;
}

const CalendarFilter = ({
	meetingDate,
	setMeetingDate,
	onApply,
}: CalendarFilterProps) => {
	const [tempDate, setTempDate] = useState<Date | null>(meetingDate);
	const handleReset = () => {
		setTempDate(null);
		setMeetingDate(null);
	};
	const handleApply = () => {
		setMeetingDate(tempDate);
		onApply();
	};

	return (
		<div className='relative px-5 py-4 bg-white rounded-lg'>
			{/* 특정 CalendarFilter 컴포넌트에서만 적용되는 스타일 */}
			<style jsx>{`
				:global(.custom-datepicker .react-datepicker) {
					border: none !important;
				}
				:global(.custom-datepicker .react-datepicker__month-container) {
					border: none !important;
				}
				:global(.custom-datepicker .react-datepicker__header) {
					background-color: transparent !important;
					border: none !important;
				}
				:global(.custom-datepicker .react-datepicker__day-names) {
					margin-bottom: -15px !important;
				}
				:global(.custom-datepicker .react-datepicker__day-name) {
					font-weight: bold !important;
				}
			`}</style>

			<div className='custom-datepicker'>
				<DatePicker
					selected={tempDate}
					onChange={(date) => setTempDate(date)}
					inline
				/>
			</div>

			<div className='flex gap-2 justify-center'>
				<Button onClick={handleReset} variation='outline' isFull={true}>
					초기화
				</Button>
				<Button
					onClick={handleApply}
					variation='default'
					isFull={true}
					disabled={!tempDate}
				>
					적용
				</Button>
			</div>
		</div>
	);
};

export default CalendarFilter;
