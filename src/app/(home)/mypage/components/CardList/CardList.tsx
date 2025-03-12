'use client';

import CardBase from './CardBase';
import Link from 'next/link';
import type { MyMeeting, MyMeetingCardType } from '@/types/meetingsType';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import type { UseSuspenseQueryOptions } from '@tanstack/react-query';
import { myMeetingService } from './Services/myMeetingService';
import { useGlobalModal } from '@/hooks/customs/useGlobalModal';
import { leaveGroup } from '@/api/detail-meeting/participantsGroup';
interface CardListProps {
	cardType: 'joined' | 'hosted';
	pageKey: 'joined' | 'review' | 'hosted';
	initialData?: MyMeeting[] | MyMeetingCardType[];
}

/** no data const */
const noDataMsg = {
	joined: '신청한 모임이 아직 없어요',
	review: '아직 작성 가능한 리뷰가 없어요',
	hosted: '아직 만든 모임이 없어요',
};

function CardList({ cardType, pageKey, initialData }: CardListProps) {
	let authToken = null;
	if (typeof window !== 'undefined') {
		// 브라우저 환경에서만 실행
		authToken = localStorage.getItem('authToken') ?? ''; // 값이 없으면 빈 문자열로 보내기
	}

	// page 별 queryFuncSetter
	const returnQueryFunc = (pageKey: 'joined' | 'review' | 'hosted') => {
		const funcMap = {
			joined: myMeetingService.getMarkedMyMeetings,
			review: myMeetingService.getMyCompletedMeetings,
			hosted: myMeetingService.getMyHostedMeetings,
		};

		return funcMap[pageKey] || null;
	};

	const queryFunction = () => {
		const queryFunc = returnQueryFunc(pageKey);
		if (!queryFunc) return null;

		return queryFunc({
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		});
	};

	const queryOptions: UseSuspenseQueryOptions<
		MyMeetingCardType[] | MyMeeting[] | null
	> = {
		queryKey: ['mypage', pageKey, !!authToken],
		queryFn: authToken
			? queryFunction
			: () => {
					return null;
				},
		initialData,
	};

	// 클라이언트 fetch
	const { data, refetch } = useSuspenseQuery<MyMeeting[] | null>(queryOptions);
	const { openModal, closeModal } = useGlobalModal();
	// const data = initialData;
	/** 데이터 없을 경우 처리 */
	if (!data?.length) {
		return (
			<div className='flex justify-center items-center mx-auto my-auto'>
				<span>{noDataMsg[pageKey ?? 'joined']}</span>
			</div>
		);
	}

	const handleClickCancel = (e: React.MouseEvent, id: number) => {
		e.preventDefault();
		e.stopPropagation();

		openModal({
			content: '예약을 취소하시겠습니까?',
			confirmType: 'Confirm',
			onConfirm: async () => {
				const res = await leaveGroup(id);

				if (res) {
					const data = await myMeetingService.fetchMyMeetings<MyMeeting[]>({
						completed: false,
						reviewed: false,
					});

					if (data) {
						await refetch();
						return closeModal();
					}
				}
			},
			onDismiss: closeModal,
		});
	};

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
								isReviewed={meeting.isReviewed}
								canLeave={
									'canLeave' in meeting &&
									(meeting.canLeave as MyMeetingCardType['canLeave'])
								}
								onCancelClick={(e, id) => handleClickCancel!(e, id)}
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
