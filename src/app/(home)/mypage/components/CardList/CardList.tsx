'use client';

import { useMyMeetings } from '@/hooks/customs/useMyMeetings';
import CardBase from './CardBase';
import Link from 'next/link';

interface CardListProps {
	cardType: 'joined' | 'hosted';
	pageKey: 'joined' | 'review' | 'hosted';
}

/** no data const */
const noDataMsg = {
	joined: '신청한 모임이 아직 없어요',
	review: '아직 작성 가능한 리뷰가 없어요',
	hosted: '아직 만든 모임이 없어요',
};

function CardList({ cardType, pageKey }: CardListProps) {
	const { meetings, onCancelClick } = useMyMeetings(pageKey);

	/** 데이터 없을 경우 처리 */
	if (!meetings?.length) {
		return (
			<div className='flex justify-center items-center mx-auto my-auto'>
				<span>{noDataMsg[pageKey ?? 'joined']}</span>
			</div>
		);
	}

	return (
		<div className='grow overflow-hidden'>
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
		</div>
	);
}

export default CardList;
