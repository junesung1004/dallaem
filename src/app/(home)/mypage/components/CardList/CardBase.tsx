import Image from 'next/image';
import CardInfo from './CardInfo';
import Tag from '../Tag/TagBase';
import Button from '@/components/Button/Button';
import type { MeetingCardInfoProps } from './CardInfo';
import type { IMeeting } from '@/types/meetingsType';
import { cloneElement } from 'react';
import dynamic from 'next/dynamic';

/** todo 우석님 코드 --> utils 등에 공통화 필요 */
const formatDateOrTime = (isoString: string, type: 'date' | 'time'): string => {
	const date = new Date(isoString);

	if (type === 'date') {
		const month = date.getMonth() + 1;
		const day = date.getDate();
		return `${month}월 ${day}일`;
	}

	if (type === 'time') {
		const hours = date.getHours();
		const minutes = date.getMinutes();
		return `${hours.toString().padStart(2, '0')} : ${minutes
			.toString()
			.padStart(2, '0')}`;
	}

	return '';
};

/**
 * 오늘 날짜가 지났는지 검사하는 유효성 검사 함수
 * @param {string} date - 검사할 날짜 (ISO 형식)
 * @returns {boolean} - 날짜가 지났으면 true, 그렇지 않으면 false
 */
const getIsDatePassed = (date: string) => {
	const inputDate = new Date(date);
	const today = new Date();

	return inputDate < today;
};

interface TagProps {
	isDone: boolean;
	isCreated: boolean;
}

interface MeetingCardBaseProps extends MeetingCardInfoProps, TagProps {
	canceledAt: IMeeting['canceledAt'];
	isReviewed: boolean;
	canLeave: boolean;
}

/** Base 가 되는 카드 */
function CardBase({
	children,
	data,
}: {
	children: React.ReactElement;
	data: IMeeting;
}) {
	// 데이터를 가공한다(가공되는 데이터는 title, ...등등 클라이언트의 key 값으로 필요한 것들이다)
	const propData: MeetingCardInfoProps & TagProps = {
		id: data?.id,
		title: data?.name,
		location: data?.location,
		meetingDate: formatDateOrTime(data?.dateTime, 'date'),
		meetingTime: formatDateOrTime(data?.dateTime, 'time'),
		curCount: data?.participantCount,
		fullCount: data?.capacity,
		isDone: getIsDatePassed(data?.dateTime),
		isCreated: Number(data?.participantCount) >= 5,
	};

	return (
		<div className='flex items-center gap-4 pt-4 pb-2 flex-wrap'>
			<div className='relative overflow-hidden rounded-3xl min-w-[8rem] grow-[1] sm:w-[19.5rem] max-w-[19.5rem] h-[10rem] sm:basis-0'>
				<Image
					src={data?.image || '/images/profile/profileDefaultLarge.png'}
					fill={true}
					className='inline-block object-cover'
					alt=''
				/>
			</div>
			{cloneElement(children, { ...propData })}
		</div>
	);
}

/** 나의 모임 */
const CreateReviewButton = dynamic(() => import('./CreateReviewButton'), {
	loading: () => <Button>리뷰 작성하기</Button>,
	ssr: !!false,
});

function JoinedMeetingCard({
	id,
	isDone,
	isCreated,
	onCancelClick,
	isReviewed,
	canLeave,
	...props
}: Partial<MeetingCardBaseProps> & {
	onCancelClick: (e: React.MouseEvent, id: number) => void;
}) {
	if (!props || !id) return null;

	return (
		<div className='flex flex-col gap-4 sm:grow-[1] sm:basis-0 overflow-hidden'>
			<div className='flex flex-col gap-2'>
				<div className='flex flex-wrap gap-2 mb-1'>
					<Tag.MeetingState isDone={isDone ?? false} />
					{!isDone && <Tag.MeetingCreateState isCreated={isCreated ?? false} />}
				</div>
				<CardInfo {...(props as MeetingCardInfoProps)} />
			</div>
			{!isReviewed && <CreateReviewButton meetingId={id} />}
			{!isDone && canLeave && (
				<Button
					variation='outline'
					onClick={(e) => {
						onCancelClick(e, Number(id));
					}}
				>
					예약 취소하기
				</Button>
			)}
		</div>
	);
}

/** 내가 만든 모임 */
function HostedMeetingCard(props: Partial<MeetingCardInfoProps>) {
	if (!props) return null;
	return (
		<div className='flex flex-col gap-4 sm:grow-[1] sm:basis-0 overflow-hidden'>
			<CardInfo {...(props as MeetingCardInfoProps)} />
		</div>
	);
}

CardBase.JoinedMeetingCard = JoinedMeetingCard;
CardBase.HostedMeetingCard = HostedMeetingCard;

export default CardBase;
