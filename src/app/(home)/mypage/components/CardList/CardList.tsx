'use client';

import { useMyMeetings } from '@/hooks/customs/useMyMeetings';
import CardBase from './CardBase';
import Link from 'next/link';

interface CardListProps {
	cardType: 'joined' | 'hosted';
	pageKey: 'joined' | 'review' | 'hosted';
}

function CardList({ cardType, pageKey }: CardListProps) {
	const { meetings, onCancelClick } = useMyMeetings(pageKey);

	return (
		<div>
			{meetings?.map((meeting) => (
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
