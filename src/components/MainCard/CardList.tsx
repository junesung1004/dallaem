'use client';

import { useRouter } from 'next/navigation';
import { DateBadge } from '../Badge/DateBadge';
import { LikeButton } from '../Button/LikeButton';
import Card from './Card';
import { useEffect, useState } from 'react';
import { getMeetingData } from '@/api/meeting/getMeetingDate';
import { CreateMeeting } from '@/types/createMeetingType';
import Members from '../Members/Members';
import { StatusBadge } from '../Badge/StatusBadge';
import ProgressBar from '../ProgressBar/ProgressBar';
import { DeadlineBadge } from '../Badge/DeadlineBadge';

export default function CardList() {
	const [meetings, setMeetings] = useState<CreateMeeting[]>();
	const router = useRouter();

	// console.log('meetings : ', meetings);

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
					<Card.ImageContainer>
						<Card.ImageSection
							src={el.image ? el.image : '/images/default.png'}
							alt='이미지 예시'
						/>
						<DeadlineBadge registrationEnd={el.registrationEnd} />
					</Card.ImageContainer>

					<Card.Content>
						<Card.Header>
							{/* 왼쪽 섹션 */}
							<Card.Header.Left
								title={
									el.type === 'OFFICE_STRETCHING'
										? '달램핏 마인드풀니스 |'
										: el.type === 'MINDFULNESS'
											? '달램핏 마인드풀니스 |'
											: el.type === 'WORKATION'
												? '워크에이션 리프레쉬 |'
												: ''
								}
								place={el.location}
							>
								<DateBadge
									text={
										el.dateTime && !isNaN(new Date(el.dateTime).getTime())
											? new Date(el.dateTime).toLocaleDateString('ko-KR')
											: ''
									}
									type='date'
								/>

								<DateBadge
									text={
										el.registrationEnd
											? new Date(el.registrationEnd).toISOString() // Date 객체를 string으로 변환
											: '유효하지 않은 시간'
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
						>
							<div className='flex gap-2'>
								<Members max={el.capacity ?? 0} value={2} />
								<StatusBadge />
							</div>
							<ProgressBar
								max={10}
								value={el.capacity ?? 0}
								isNeutral={false}
								isAnimate={false}
							/>
						</Card.Footer>
					</Card.Content>
				</Card>
			))}
		</div>
	);
}
