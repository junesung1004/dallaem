'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFilterStore } from '@/store/useInputSelectFilterStore';
import { getMeetingData } from '@/api/meeting/getMeetingDate';
import { CreateMeeting } from '@/types/createMeetingType';
import Card from './Card';
import { DateBadge } from '../Badge/DateBadge';
import { LikeButton } from '../Button/LikeButton';
import Members from '../Members/Members';
import { StatusBadge } from '../Badge/StatusBadge';
import ProgressBar from '../ProgressBar/ProgressBar';
import { DeadlineBadge } from '../Badge/DeadlineBadge';

export default function CardList() {
	const [meetings, setMeetings] = useState<CreateMeeting[]>([]);
	const router = useRouter();

	// 🟢 Zustand에서 전역 필터 상태 가져오기
	const { selectedFilters } = useFilterStore();

	// ✅ 모임 데이터 가져오기
	const getMeetingListDate = async () => {
		try {
			const res = await getMeetingData();
			setMeetings(res);
		} catch (error) {
			console.error('모임 목록 가져오기 실패:', error);
		}
	};

	useEffect(() => {
		getMeetingListDate();
	}, []);

	// ✅ 필터 적용된 모임 목록
	const filteredMeetings = meetings?.filter((meeting) => {
		const locationMatch =
			!selectedFilters.location ||
			meeting.location.includes(selectedFilters.location);

		const dateMatch =
			!selectedFilters.date ||
			(meeting.dateTime &&
				new Date(meeting.dateTime)
					.toISOString()
					.startsWith(selectedFilters.date));

		return locationMatch && dateMatch;
	});

	return (
		<div className='flex flex-col items-center gap-6'>
			{filteredMeetings?.map((el) => (
				<Card key={el.id ?? 0}>
					<Card.ImageContainer>
						<Card.ImageSection
							src={el.image ? el.image : '/images/default.png'}
							alt='이미지 예시'
						/>
						<DeadlineBadge
							registrationEnd={
								el.registrationEnd
									? new Date(el.registrationEnd).toISOString()
									: '유효하지 않은 시간'
							}
						/>
					</Card.ImageContainer>

					<Card.Content>
						<Card.Header>
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
											? new Date(el.registrationEnd).toISOString()
											: '유효하지 않은 시간'
									}
									type='time'
								/>
							</Card.Header.Left>

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
