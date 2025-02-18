'use client';

import React, { useState, useEffect } from 'react';
import { MeetingCard } from '@/app/(home)/meeting/_components/MeetingCard';
import { DeadlineBadge } from '@/components/Badge/DeadlineBadge';
import { Footer } from '../_components/footer';
import { Pagination } from '../_components/Pagination';
import Image from 'next/image';
import {
	DummyReviewDataType,
	ReviewType,
	DummyDataType,
} from '@/types/paginationType';

const DummyData: DummyDataType[] = [
	{
		teamId: '71',
		id: 12,
		type: 'OFFICE_STRETCHING',
		name: '1',
		dateTime: '2025-02-17T04:48:55.087Z',
		registrationEnd: '2025-02-14T04:48:55.087Z',
		location: '건대입구',
		participantCount: 0,
		capacity: 10,
		image:
			'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1738904240393_EVERYTHING.jpg',
		createdBy: 9310151325,
		canceledAt: null,
	},
];

const DummyReviewData: DummyReviewDataType = {
	data: [
		{
			teamId: '7',
			id: 1,
			score: 2,
			comment: '리뷰테스트1',
			createdAt: '2025-02-17T05:55:59.349Z',
			Gathering: {
				teamId: '7',
				id: 1825,
				type: 'MINDFULNESS',
				name: 'string5',
				dateTime: '2025-02-20T05:51:19.482Z',
				location: '홍대입구',
				image:
					'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1739771733913_4.jpg',
			},
			User: {
				teamId: '7',
				id: 1119,
				name: 'test',
				image: null,
			},
		},
		{
			teamId: '7',
			id: 2,
			score: 2,
			comment: '리뷰테스트1',
			createdAt: '2025-02-17T05:55:59.349Z',
			Gathering: {
				teamId: '7',
				id: 1825,
				type: 'MINDFULNESS',
				name: 'string5',
				dateTime: '2025-02-20T05:51:19.482Z',
				location: '홍대입구',
				image:
					'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1739771733913_4.jpg',
			},
			User: {
				teamId: '7',
				id: 1119,
				name: 'test',
				image: null,
			},
		},
		{
			teamId: '7',
			id: 3,
			score: 2,
			comment: '리뷰테스트1',
			createdAt: '2025-02-17T05:55:59.349Z',
			Gathering: {
				teamId: '7',
				id: 1825,
				type: 'MINDFULNESS',
				name: 'string5',
				dateTime: '2025-02-20T05:51:19.482Z',
				location: '홍대입구',
				image:
					'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1739771733913_4.jpg',
			},
			User: {
				teamId: '7',
				id: 1119,
				name: 'test',
				image: null,
			},
		},
	],
	totalItemCount: 2,
	currentPage: 1,
	totalPages: 1,
};

export default function DetailPage() {
	const [currentPage, setCurrentPage] = useState(1);
	const [reviewsData, setReviewsData] = useState<ReviewType[]>([]);
	const totalPages = Math.ceil(DummyReviewData.totalItemCount / 4);

	const fetchReviews = (page: number) => {
		const offset = (page - 1) * 4;
		const fetchedReviews = DummyReviewData.data.slice(offset, offset + 4);
		setReviewsData(fetchedReviews);
	};

	useEffect(() => {
		fetchReviews(currentPage);
	}, [currentPage]);

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};
	return (
		<div className='px-28 py-12 min-h-screen'>
			<div className='flex flex-wrap gap-7 justify-center w-full'>
				<div className='flex-1 w-full min-w-[300px] h-72'>
					<div className='overflow-hidden border-[2px] border-gray-200 shadow-md rounded-3xl '>
						<div className='relative'>
							<DeadlineBadge registrationEnd='2025-02-13T04:48:55.087Z' />
							<Image
								src='/images/imgLogin.png'
								alt='더미 이미지'
								width={400}
								height={300}
								className='w-full min-w-[300px] h-72'
							/>
						</div>
					</div>
				</div>
				<div className='flex-1 min-w-[300px]'>
					<MeetingCard
						type={DummyData[0].type}
						location={DummyData[0].location}
						date={DummyData[0].registrationEnd}
						id={DummyData[0].id}
					/>
				</div>
			</div>
			<div>
				<Pagination
					currentData={reviewsData}
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			</div>
			<div className='fixed bottom-0 left-0 w-full '>
				<Footer createdBy={DummyData[0].createdBy} />
			</div>
		</div>
	);
}
