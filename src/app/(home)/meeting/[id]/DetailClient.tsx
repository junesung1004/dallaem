'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { DeadlineBadge } from '@/components/Badge/DeadlineBadge';
import { MeetingCard } from '../_components/MeetingCard';
import { Footer } from '../_components/footer';
import { DetailMeetingDataType } from '@/types/meetingDetail';

export default function DetailClient({
	detailData,
}: {
	detailData: DetailMeetingDataType;
}) {
	const [participantCount, setParticipantCount] = useState(
		detailData.participantCount,
	);

	useEffect(() => {
		setParticipantCount(detailData.participantCount);
	}, [detailData.participantCount]);

	const isPastMeeting = new Date(detailData.dateTime) < new Date();

	const updateParticipantCount = (delta: number) => {
		setParticipantCount((prev) => prev + delta);
	};

	return (
		<div>
			<div className='flex flex-wrap gap-7 justify-center w-full'>
				<div className='flex-1 w-full min-w-[300px] h-72 overflow-hidden border-[2px] relative border-gray-200 shadow-md rounded-3xl'>
					<DeadlineBadge registrationEnd={detailData.registrationEnd} />
					<Image
						src={detailData.image}
						alt='더미 이미지'
						width={400}
						height={300}
						className='w-full min-w-[300px] h-72'
					/>
				</div>

				<div className='flex-1 min-w-[300px]'>
					<MeetingCard
						id={detailData.id}
						name={detailData.name}
						location={detailData.location}
						date={detailData.dateTime}
						capacity={detailData.capacity}
						participantCount={participantCount}
					/>
				</div>
			</div>

			{!isPastMeeting && (
				<div className='fixed bottom-0 left-0 w-full'>
					<Footer
						createdBy={detailData.createdBy}
						capacity={detailData.capacity}
						participantCount={participantCount}
						updateParticipantCount={updateParticipantCount}
					/>
				</div>
			)}
		</div>
	);
}
