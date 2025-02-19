'use client';

import { useState, useEffect } from 'react';
import { DateBadge } from '../../../../components/Badge/DateBadge';
import { MeetingCardProps } from '../../../../types/meetingDetail';
import { LikeButton } from '../../../../components/Button/LikeButton';
import { AttendeeProfiles } from './AttendeeProfiles';

export const MeetingCard = ({ location, type, date, id }: MeetingCardProps) => {
	const [userId, setUserId] = useState<number | undefined>(undefined);

	useEffect(() => {
		const storedUserId = localStorage.getItem('userId');
		if (storedUserId) {
			setUserId(Number(storedUserId));
		}
	}, []);
	return (
		<div className='flex flex-col shadow-md rounded-3xl border-[2px] border-gray-200 relative w-full'>
			<div className='p-6'>
				<div className='absolute top-6 right-6'>
					<LikeButton itemId={id} userId={userId} />
				</div>

				<div className='flex flex-col gap-1'>
					<div className='text-lg font-bold'>{type}</div>
					<div className='text-sm text-gray-600'>{location}</div>

					<div className='flex items-center gap-2 my-2 mb-7'>
						<DateBadge text={date} type='date' />
						<DateBadge text={date} type='time' />
					</div>
				</div>
			</div>

			<div className='border-[1.2px] border-gray-200 border-dashed mb-2'>
				<div id='AttendeeProfiles' className='w-1/3 border border-2'>
					<AttendeeProfiles meetingId={id} />
				</div>
			</div>

			{/* 여기 아래는 더미데이터 */}
			<div className='mb-28'></div>
		</div>
	);
};
