'use client';

import { usePathname, useRouter } from 'next/navigation';

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
	const pathname = usePathname();

	const { meetings } = useMainCard(initialData || [], meetingType);


	return (
		<div className='flex flex-col items-center gap-6'>
			{/* 찜한 모임 목록 페이지일 경우 */}
			{pathname === '/favorite-meetings' &&
				meetings?.map((el) => (
					<Card
						id={el.id}
						key={el.id ?? 0}
						registrationEnd={new Date(el.registrationEnd) < new Date()}
					>
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
									<Members max={el.capacity ?? 0} value={el.participantCount} />
									<StatusBadge />
								</div>
								<ProgressBar
									max={el.capacity}
									value={el.participantCount}
									isNeutral={false}
									isAnimate={false}
								/>
							</Card.Footer>
						</Card.Content>
					</Card>
				))}

			{/* 메인 홈 모임 목록 페이지일 경우 */}
			{pathname === '/' &&
				meetings
					?.filter((el) => new Date(el.registrationEnd) >= new Date())
					.map((el) => (
						<Card
							id={el.id}
							key={el.id ?? 0}
							registrationEnd={new Date(el.registrationEnd) < new Date()}
						>
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
										<Members
											max={el.capacity ?? 0}
											value={el.participantCount}
										/>
										<StatusBadge />
									</div>
									<ProgressBar
										max={el.capacity}
										value={el.participantCount}
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
