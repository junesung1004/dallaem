'use client';

import { useRouter } from 'next/navigation';
import { DateBadge } from '../Badge/DateBadge';
import { LikeButton } from '../Button/LikeButton';
import Card from './Card';
import { useEffect, useState } from 'react';
import { getMeetingData } from '@/api/meeting/getMeetingDate';
import { CreateMeeting } from '@/types/createMeetingType';

type Dummy = {
	id: number;
	isClear: boolean;
};

const dummy: Dummy[] = [
	{ id: 1, isClear: false },
	{ id: 2, isClear: true },
	{ id: 3, isClear: false },
	{ id: 4, isClear: true },
	{ id: 5, isClear: false },
	{ id: 6, isClear: false },
	{ id: 7, isClear: true },
	{ id: 8, isClear: false },
	{ id: 9, isClear: false },
];

export default function CardList() {
	const [meetings, setMeetings] = useState<CreateMeeting[]>();
	console.log(meetings);
	const router = useRouter();

	const getMeetingListDate = async () => {
		try {
			const res = await getMeetingData();
			setMeetings(res);
		} catch (error) {
			console.error('모임 목록 가져오기 기능 실패 : ', error);
		}
	};

	useEffect(() => {
		getMeetingListDate();
	}, []);

	return (
		<div className='flex flex-col items-center gap-6'>
			{meetings?.map((el) => (
				<Card key={el.id ?? 0}>
					<Card.ImageSection
						src={el.image ? el.image : '/images/default.png'}
						alt='이미지 예시'
					/>
					<Card.Content>
						<Card.Header>
							{/* 왼쪽 섹션 */}
							<Card.Header.Left
								title='달램핏 오피스 스트레칭 |'
								place='을지로 3가'
							>
								<DateBadge
									text={
										el.dateTime
											? new Date(el.dateTime).toLocaleString('ko-KR')
											: ''
									}
									type='date'
								/>
								<DateBadge
									text={
										el.registrationEnd
											? new Date(el.registrationEnd).toLocaleString('ko-KR')
											: ''
									}
									type='time'
								/>
							</Card.Header.Left>

							{/* 오른쪽 섹션 (찜 버튼) */}
							<Card.Header.Right>
								<LikeButton itemId={el.id ?? 0} />
							</Card.Header.Right>
						</Card.Header>
						<Card.Footer
							max={40}
							value={30}
							onClick={() => {
								router.push(`meeting/${el.id}`);
							}}
						/>
					</Card.Content>
				</Card>
			))}
		</div>
	);
}
