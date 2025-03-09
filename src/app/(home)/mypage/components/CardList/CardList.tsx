'use client';

import CardBase from './CardBase';
import Link from 'next/link';
import { MyMeeting } from '@/types/meetingsType';
import {
	useQuery,
	useSuspenseQuery,
	UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { myMeetingService } from './Services/myMeetingService';
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

function CardList({ cardType, pageKey, initialData }: CardListProps) {
	// const { meetings, onCancelClick } = useMyMeetings(pageKey, initialData);
	let authToken = null;
	if (typeof window !== 'undefined') {
		// 브라우저 환경에서만 실행
		authToken = localStorage.getItem('authToken') ?? ''; // 값이 없으면 빈 문자열로 보내기
	}

	const queryFunction = () => {
		return myMeetingService.getMyMeetings({
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		});
	};

	const queryOptions: UseSuspenseQueryOptions<MyMeeting[] | null> = {
		queryKey: ['mypage', pageKey, !!authToken],
		queryFn:
			['joined', 'review'].includes(pageKey) && authToken
				? queryFunction
				: () => {
						return null;
					},
		initialData,
	};

	// 클라이언트 fetch
	const { data } = useSuspenseQuery<MyMeeting[] | null>(queryOptions);
	// const data = initialData;
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
