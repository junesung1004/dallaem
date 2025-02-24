'use client';

import HeartRatings from '@/components/HeartRatings/HeartRatings';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import { ReviewScore } from '@/types/reviewType';
import { useMemo } from 'react';

const ReviewSummary = ({ reviewScore }: { reviewScore: ReviewScore }) => {
	const rating = ['5점', '4점', '3점', '2점', '1점'];
	const starKeys = [
		'fiveStars',
		'fourStars',
		'threeStars',
		'twoStars',
		'oneStar',
	] as const;

	const totalCount = useMemo(() => {
		if (!reviewScore) return 0;
		const { averageScore, ...otherScores } = reviewScore;
		return Object.values(otherScores)
			.filter((value): value is number => typeof value === 'number')
			.reduce((sum, value) => sum + value, 0);
	}, [reviewScore]);

	return (
		<div className='bg-white flex w-full h-[180px] border-y-2 px-6 sm:px-12 md:px-36 py-8'>
			<div className='flex w-full justify-between'>
				<div className='flex flex-col w-32 justify-center items-center text-2xl font-semibold mr-4 lg:mr-0'>
					<div className='flex'>
						{reviewScore?.averageScore}
						<p className='text-gray-400'>/5</p>
					</div>
					<div>
						<HeartRatings
							rating={reviewScore?.averageScore as number}
							maxHearts={5}
						/>
					</div>
				</div>
				<div className='w-80 sm:min-w-20 flex flex-col text-sm items-center justify-center gap-1'>
					{rating.map((label, index) => (
						<div
							key={label}
							className='w-full flex whitespace-nowrap items-center gap-2'
						>
							<div>{label}</div>
							<div className='w-full'>
								<ProgressBar
									max={totalCount}
									value={reviewScore[starKeys[index]] as number}
									isNeutral={true}
									isAnimate={false}
								/>
								{/* <p>
									{reviewScore[starKeys[index]] as number}/{totalCount}
								</p> */}
							</div>
							<div>{reviewScore[starKeys[index]]}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ReviewSummary;
