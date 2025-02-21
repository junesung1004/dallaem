'use client';

import CardBase from './CardBase';
import type { IMeeting } from '@/types/createMeetingType';
import Link from 'next/link';

interface CardListProps {
	data: IMeeting[];
	cardType: 'joined' | 'hosted';
}

function CardList({ data, cardType }: CardListProps) {
	return (
		<div>
			{data?.map((meeting) => (
				<Link
					href={`/meeting/${meeting.id}`}
					key={meeting.id}
					className='meeting-card block'
				>
					<CardBase data={meeting}>
						{cardType === 'joined' ? (
							<CardBase.JoinedMeetingCard />
						) : (
							<CardBase.HostedMeetingCard />
						)}
					</CardBase>
				</Link>
			))}
			<div></div>
		</div>
	);
}

export default CardList;
