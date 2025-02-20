'use client';

import HeartRatings from '@/components/HeartRatings/HeartRatings';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import { ReviewScore } from '@/types/reviewType';

const ReviewScores = ({ reviewScore }: { reviewScore: ReviewScore }) => {
	const rating = ['5점', '4점', '3점', '2점', '1점'];

	const starKeys = [
		'fiveStars',
		'fourStars',
		'threeStars',
		'twoStars',
		'oneStar',
	];

	return (
		<div className='bg-white flex w-full h-[180px] border-y-2 px-6 sm:px-12 md:px-36 py-8'>
			<div className='flex w-full justify-between'>
				<div className='flex flex-col w-32 justify-center items-center text-2xl font-semibold mr-4 lg:mr-0'>
					<div className='flex'>
						{reviewScore?.averageScore}
						<p className='text-gray-400'>/5</p>
					</div>
					<div>
						<HeartRatings rating={reviewScore?.averageScore} maxHearts={5} />
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
								{/* 나중에 review.lenght나 totalReview 함수 만들어서 max에 값 넣기 */}
								<ProgressBar
									max={10}
									value={Number(
										reviewScore?.[starKeys[index] as keyof ReviewScore] ?? 0,
									)}
									isNeutral={true}
									isAnimate={false}
								/>
							</div>
							<div>{reviewScore?.[starKeys[index] as keyof ReviewScore]}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ReviewScores;
