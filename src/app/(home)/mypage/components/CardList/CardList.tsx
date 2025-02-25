'use client';

import CardBase from './CardBase';
import type { IMeeting } from '@/types/createMeetingType';
import Link from 'next/link';

interface CardListProps {
	data: IMeeting[];
	cardType: 'joined' | 'hosted';
	/** 임시 */
	onCancelClick?: (e: React.MouseEvent, id: number) => void;
}

function CardList({ data, cardType, onCancelClick }: CardListProps) {
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
							<CardBase.JoinedMeetingCard
								onCancelClick={(e, id) => onCancelClick!(e, id)} // 전달 시, e와 id를 넘겨줌
							/>
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
