'use client';

import { DateBadge } from '@/components/Badge/DateBadge';
import { DeadlineBadge } from '@/components/Badge/DeadlineBadge';
import { StatusBadge } from '@/components/Badge/StatusBadge';
import { LikeButton } from '@/components/Button/LikeButton';
import Card from '@/components/MainCard/Card';
import Members from '@/components/Members/Members';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import { useFavoriteMeetings } from '@/hooks/customs/useFavoriteMeetings';
import { useRouter } from 'next/navigation';

function CardList() {
	const { meetings, isLoading, error, deleteLikeMeetings } =
		useFavoriteMeetings();
	const router = useRouter();

	return (
		<div className='flex flex-col items-center gap-6'>
			{meetings?.map((el) => (
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
										? el.name
										: el.type === 'MINDFULNESS'
											? el.name
											: el.type === 'WORKATION'
												? el.name
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
								<LikeButton
									itemId={el.id ?? 0}
									onLikeChangeHandler={deleteLikeMeetings}
								/>
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
								<StatusBadge participantCount={el.participantCount} />
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

export default CardList;
