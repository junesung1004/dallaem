import React, { useEffect } from 'react';
import Card from './Card';
import { DeadlineBadge } from '../Badge/DeadlineBadge';
import { DateBadge } from '../Badge/DateBadge';
import { LikeButton } from '../Button/LikeButton';
import { useRouter } from 'next/navigation';
import Members from '../Members/Members';
import { StatusBadge } from '../Badge/StatusBadge';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useHomeMeetingCardList } from '@/hooks/query/useHomeMeetingCardList';
import { useInView } from 'react-intersection-observer';

const CardListInfinite = React.memo(function CardListInfinite() {
	const router = useRouter();
	const { ref, inView } = useInView();

	const {
		data,
		isLoading,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useHomeMeetingCardList();

	const meetings = React.useMemo(() => {
		const allMeetings = data?.pages.flatMap((page) => page?.data ?? []) ?? [];
		// ID 기반 중복 제거
		const uniqueMeetings = allMeetings.filter(
			(meeting, index, self) =>
				index === self.findIndex((m) => m.id === meeting.id),
		);
		return uniqueMeetings;
	}, [data?.pages]);

	// 요청 지연 로직 추가
	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, isFetchingNextPage]);

	// 📌 로딩 중일 때 처리
	if (isLoading) {
		return (
			<div className='flex justify-center items-center py-4'>
				<div className='w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin'>
					💓
				</div>
			</div>
		);
	}

	// 📌 에러 발생 시 처리
	if (error) {
		return (
			<p className='text-center text-red-500'>
				❌ 데이터를 불러오는 중 오류가 발생했습니다.
			</p>
		);
	}

	return (
		<div className='flex flex-col items-center gap-6'>
			{/* 메인 모임 목록 페이지일 경우 */}
			{meetings
				?.filter((el) => new Date(el.registrationEnd) >= new Date())
				.map((el) => (
					<Card
						onClick={() => router.push(`meeting/${el.id}`)}
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
								<Card.Header.Left title={el.name} place={el.location}>
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
											el.dateTime
												? new Date(el.dateTime).toISOString()
												: '유효하지 않은 시간'
										}
										type='time'
									/>
								</Card.Header.Left>

								<Card.Header.Right>
									<LikeButton itemId={el.id ?? 0} />
								</Card.Header.Right>
							</Card.Header>

							<Card.Footer max={40} value={30}>
								<div className='flex gap-2'>
									<Members max={el.capacity ?? 0} value={el.participantCount} />
									<StatusBadge participantCount={el.participantCount} />
								</div>
								<ProgressBar
									max={el.capacity}
									value={el.participantCount}
									isNeutral={false}
									isAnimate={true}
								/>
							</Card.Footer>
						</Card.Content>
					</Card>
				))}

			{/* 무한스크롤 로딩 스피너 */}
			{hasNextPage && (
				<div ref={ref} className='flex justify-center items-center py-4'>
					<div className='w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin'></div>
				</div>
			)}
		</div>
	);
});

export default CardListInfinite;
