'use client';

import { useRouter } from 'next/navigation';

import Card from './Card';
import { DateBadge } from '../Badge/DateBadge';
import { LikeButton } from '../Button/LikeButton';
import Members from '../Members/Members';
import { StatusBadge } from '../Badge/StatusBadge';
import ProgressBar from '../ProgressBar/ProgressBar';
import { DeadlineBadge } from '../Badge/DeadlineBadge';

import { useMainCard } from '@/hooks/customs/useMainCard';
import type { MeetingCardListProps } from '@/types/meetingsType';

export default function CardList({
	initialData,
	meetingType,
}: MeetingCardListProps) {
	const router = useRouter();
	const { meetings } = useMainCard(initialData || [], meetingType);

	return (
		<div className='flex flex-col items-center gap-6'>
			{/* {filteredMeetings?.map((el) => ( */}
			{meetings?.map((el) => (
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
