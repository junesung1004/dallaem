'use client';

import FilterList from '@/components/Filtering/FIlterList';
import { ReviewScore } from '@/types/reviewType';
import { useEffect, useState } from 'react';
import ReviewScores from './_components/reviewScores';
import PageNavbar from '@/components/PageNav/PageNavbar';
import PageInfo from '@/components/PageInfo/PageInfo';
import ReviewCard from '@/components/ReviewCard/ReviewCard';
import { getReviewScore } from '@/api/getReveiwScore';

export default function AllReviews() {
	const [selectedFilters, setSelectedFilters] = useState({});
	const [reviewScore, setReviewScore] = useState<ReviewScore[] | null>(null);

	useEffect(() => {
		getReviewScore({ gatheringId: '', type: '' })
			.then((res) => {
				setReviewScore(res);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className='flex flex-col gap-6'>
			<div className='flex flex-col gap-3 pb-4 border-b-2 border-gray-200 '>
				<PageInfo pageKey='reviews' />
				<PageNavbar pageKey='meetings' />
			</div>
			{reviewScore && reviewScore.length > 0 && (
				<ReviewScores reviewScore={reviewScore[0]} />
			)}
			<div className='flex flex-col gap-4 p-4 bg-white border-t-2 border-gray-900'>
				<FilterList
					// 사용 가능한 필터 선택
					enabledFilters={['location', 'date', 'sortByReview']}
					selectedFilters={selectedFilters}
					onFilterChange={(filters) =>
						setSelectedFilters({
							location: filters.location || '',
							date: filters.date || '',
							sortReview: filters.sortReview || {
								sortBy: 'createdAt',
								sortOrder: 'asc',
							},
						})
					}
				/>
				<div>
					<ReviewCard>
						<ReviewCard.ImageSection src='/images/imgLogin.png' />
						<ReviewCard.ReviewLayout>
							<ReviewCard.HeartScore score={5} />
							<ReviewCard.Content comment='따듯하게 느껴지는 공간이에요 :) 평소에 달램 이용해보고 싶었는데 이렇게 같이 달램 생기니까 너무 좋아요! 프로그램이 더 많이 늘어났으면 좋겠어요.' />
							<ReviewCard.EtcInfo
								userIcon='/images/profile/profileDefaultLarge.png'
								nickname='박채'
								type='DALLAEMFIT'
								location='건대입구'
								date='2025-02-12'
							/>
						</ReviewCard.ReviewLayout>
					</ReviewCard>
					<ReviewCard>
						<ReviewCard.ImageSection src='/images/imgLogin.png' />
						<ReviewCard.ReviewLayout>
							<ReviewCard.HeartScore score={5} />
							<ReviewCard.Content comment='좋아요요' />
							<ReviewCard.EtcInfo
								userIcon='/images/profile/profileDefaultLarge.png'
								nickname='박채'
								type='DALLAEMFIT'
								location='건대입구'
								date='2025-02-12'
							/>
						</ReviewCard.ReviewLayout>
					</ReviewCard>
				</div>
			</div>
		</div>
	);
}
