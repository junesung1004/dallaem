import Image from 'next/image';
import CardInfo from './CardInfo';
import Tag from '../Tag/TagBase';
import Button from '@/components/Button/Button';
import type { IMeeting } from '@/app/(home)/mypage/page';
import type { MeetingCardInfoProps } from './CardInfo';
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
		<div className='flex gap-4 pt-4 pb-2'>
			<div className='relative overflow-hidden w-[17rem] h-[10rem] rounded-3xl'>
				<Image
					src={
						'https://plus.unsplash.com/premium_photo-1681324259575-f6ad9653e2fd?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
					}
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
function JoinedMeetingCard({
	isDone,
	isCreated,
	...props
}: Partial<MeetingCardInfoProps & TagProps>) {
	const CreateReviewButton = dynamic(() => import('./CreateReviewButton'), {
		loading: () => (
			<Button state='default' isOutlined={false}>
				리뷰 작성하기
			</Button>
		),
		ssr: !!false,
	});

	if (!props) return null;

	return (
		<div className='flex flex-col gap-4 grow'>
			<div className='flex flex-col gap-2'>
				<div className='flex gap-2 mb-1'>
					<Tag.MeetingState isDone={isDone ?? false} />
					{!isDone && <Tag.MeetingCreateState isCreated={isCreated ?? false} />}
				</div>
				<CardInfo {...(props as MeetingCardInfoProps)} />
			</div>
			{!!isDone && <CreateReviewButton />}
			{!isDone && (
				<Button state='default' isOutlined={true}>
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
		<div>
			<CardInfo {...(props as MeetingCardInfoProps)} />
		</div>
	);
}

CardBase.JoinedMeetingCard = JoinedMeetingCard;
CardBase.HostedMeetingCard = HostedMeetingCard;

export default CardBase;
