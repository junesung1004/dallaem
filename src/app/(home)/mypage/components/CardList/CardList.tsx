// 'use client';

import { useMyMeetings } from '@/hooks/customs/useMyMeetings';
import CardBase from './CardBase';
import Link from 'next/link';
import { MyMeeting } from '@/types/meetingsType';

interface CardListProps {
	cardType: 'joined' | 'hosted';
	pageKey: 'joined' | 'review' | 'hosted';
	initialData?: MyMeeting[];
}

/** no data const */
const noDataMsg = {
	joined: '신청한 모임이 아직 없어요',
	review: '아직 작성 가능한 리뷰가 없어요',
	hosted: '아직 만든 모임이 없어요',
};

function CardList({ cardType, pageKey, initialData }: CardListProps) {
	// const { meetings, onCancelClick } = useMyMeetings(pageKey, initialData ?? []);

	// const data = initialData || meetings;
	const data = initialData;
	console.log('데이터 보여주세요', data);
	/** 데이터 없을 경우 처리 */
	if (!data?.length) {
		return (
			<div className='flex justify-center items-center mx-auto my-auto'>
				<span>{noDataMsg[pageKey ?? 'joined']}</span>
			</div>
		);
	}

	return (
		<div className='grow overflow-hidden'>
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
		</div>
	);
}

export default CardList;
