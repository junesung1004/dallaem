'use client';

import { useState, useEffect } from 'react';
import { DateBadge } from '../../../../components/Badge/DateBadge';
import { MeetingCardProps } from '../../../../types/meetingDetail';
import { LikeButton } from '../../../../components/Button/LikeButton';
import { AttendeeProfiles } from './AttendeeProfiles';
import { StatusBadge } from '@/components/Badge/StatusBadge';
import ProgressBar from '@/components/ProgressBar/ProgressBar';

export const MeetingCard = ({
	location,
	type,
	date,
	id,
	capacity,
	participantCount,
}: MeetingCardProps) => {
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

					<div className='flex items-center gap-2 my-2 mb-5'>
						<DateBadge text={date} type='date' />
						<DateBadge text={date} type='time' />
					</div>
				</div>
			</div>
			<div className='w-full border-b-2  border-dashed border-gray-200'></div>

			<div className='px-7 py-3 space-y-3  mb-2'>
				<div className='flex justify-between mt-3'>
					<div className='flex space-x-5'>
						<div className='font-bold'>모집 정원 {participantCount}명</div>
						<div id='AttendeeProfiles'>
							<AttendeeProfiles
								gatheringId={id}
								participantCount={participantCount}
							/>
						</div>
					</div>
					<div>
						<StatusBadge participantCount={participantCount} />
					</div>
				</div>
				<ProgressBar value={participantCount} max={capacity} isAnimate={true} />
				<div className='flex justify-between '>
					<div>최소인원 5명</div>
					<div className='text-primary-500'>최대인원 {capacity}명</div>
				</div>
			</div>
		</div>
	);
};
