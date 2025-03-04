'use client';

import HeartRatings from '@/components/HeartRatings/HeartRatings';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import { REVIEW_SCORES } from '@/constants';
import { useMemo } from 'react';
import useFetchReviewScores from '@/hooks/query/useFetchReviewsScore';
import useFetchReviewsData from '@/hooks/query/useFetchReviewData';
import { Datum } from '@/types/reviewType';

const ReviewSummary = () => {
	const { data } = useFetchReviewsData();
	const reviews = data?.pages.flatMap((page) => page.totalPages) ?? [];

	const gatheringIdList = useMemo(() => {
		return [
			...new Set(
				reviews
					.map((review: Datum) => review.Gathering?.id)
					.filter((id): id is number => typeof id === 'number'),
			),
		].join(',');
	}, [reviews]);

	const reviewScore = useFetchReviewScores({ gatheringId: gatheringIdList });

	const rating = ['5점', '4점', '3점', '2점', '1점'];
	const starKeys = [
		'fiveStars',
		'fourStars',
		'threeStars',
		'twoStars',
		'oneStar',
	] as const;

	// 리뷰 객체 배열 하나로 합치는 로직
	const mergedReviewScore = useMemo(() => {
		if (!reviewScore) return null;

		if (Array.isArray(reviewScore)) {
			return reviewScore.reduce(
				(acc, score) => ({
					oneStar: acc.oneStar + score.oneStar,
					twoStars: acc.twoStars + score.twoStars,
					threeStars: acc.threeStars + score.threeStars,
					fourStars: acc.fourStars + score.fourStars,
					fiveStars: acc.fiveStars + score.fiveStars,
				}),
				{ ...REVIEW_SCORES },
			);
		}

		return reviewScore;
	}, [reviewScore]);

	const totalCount = useMemo(() => {
		if (!mergedReviewScore) return 0;
		return starKeys.reduce(
			(sum, key) => sum + (mergedReviewScore[key] || 0),
			0,
		);
	}, [mergedReviewScore]);

	// 평균 값 다시 계산하는 로직
	const averageScore = useMemo(() => {
		if (!mergedReviewScore || totalCount === 0) return 0;

		const totalScore =
			mergedReviewScore.oneStar * 1 +
			mergedReviewScore.twoStars * 2 +
			mergedReviewScore.threeStars * 3 +
			mergedReviewScore.fourStars * 4 +
			mergedReviewScore.fiveStars * 5;

		return Math.round((totalScore / totalCount) * 10) / 10;
	}, [mergedReviewScore, totalCount]);

	return (
		<div className='bg-white flex w-full h-[180px] border-y-2 px-6 sm:px-12 md:px-36 py-8'>
			<div className='flex w-full justify-between'>
				<div className='flex flex-col w-32 justify-center items-center text-2xl font-semibold mr-4 lg:mr-0'>
					<div className='flex'>
						{averageScore}
						<p className='text-gray-400'>/5</p>
					</div>
					<div>
						<HeartRatings rating={averageScore} maxHearts={5} />
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
									value={mergedReviewScore?.[starKeys[index]] || 0}
									isNeutral={true}
									isAnimate={false}
								/>
							</div>
							<div>{mergedReviewScore?.[starKeys[index]]}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ReviewSummary;
