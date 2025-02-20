'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { MeetingCard } from '@/app/(home)/meeting/_components/MeetingCard';
import { DeadlineBadge } from '@/components/Badge/DeadlineBadge';
import { Footer } from '../_components/footer';
import { Pagination } from '../_components/Pagination';
import Image from 'next/image';
import { ReviewType } from '@/types/paginationType';
import { getDetailMeetingData } from '@/api/detail-meeting/getDetailMeetingDate';
import { DetailMeetingDataType } from '@/types/meetingDetail';
import { reviewService } from '@/service/reviewService';

export default function DetailPage() {
	const params = useParams();
	const id = params.id as string;
	const [meetingData, setMeetingData] = useState<DetailMeetingDataType | null>(
		null,
	);

	const limit = 4;
	const [currentPage, setCurrentPage] = useState(1);
	const [reviewsData, setReviewsData] = useState<ReviewType[]>([]);
	const [totalPages, setTotalPages] = useState(1);
	const [isReviewLoading, setIsReviewLoading] = useState(true);

	// 디테일 페이지 모임 데이터
	useEffect(() => {
		const fetchMeetingData = async () => {
			try {
				const data = await getDetailMeetingData(id);
				if (data) {
					setMeetingData(data);
				}
			} catch (err) {
				console.log(`에러`, err);
			}
		};
		if (id) fetchMeetingData();
	}, [id]);

	// 디테일 페이지 리뷰 데이터
	useEffect(() => {
		const fetchReviews = async () => {
			setIsReviewLoading(true);
			try {
				const { data, totalItemCount } =
					await reviewService.getDetailReviewData({
						gatheringId: id,
						limit: limit,
						currentPage: currentPage,
					});
				setReviewsData(data);
				setTotalPages(Math.ceil(totalItemCount / limit));
			} catch (err) {
				console.log(`리뷰 데이터 가져오기 실패:`, err);
			}
			setIsReviewLoading(false);
		};
		if (id) fetchReviews();
	}, [id, currentPage]);

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	if (!meetingData) {
		return <div>데이터가 없습니다.</div>;
	}

	return (
		<div className='mb-5 min-h-screen'>
			<div className='flex flex-wrap gap-7 justify-center w-full'>
				<div className='flex-1 w-full min-w-[300px] h-72 overflow-hidden border-[2px] relative border-gray-200 shadow-md rounded-3xl'>
					<DeadlineBadge registrationEnd={meetingData.registrationEnd} />
					<Image
						src={meetingData.image}
						alt='더미 이미지'
						width={400}
						height={300}
						className='w-full min-w-[300px] h-72'
					/>
				</div>
				<div className='flex-1 min-w-[300px]'>
					<MeetingCard
						type={meetingData.type}
						location={meetingData.location}
						date={meetingData.dateTime}
						id={meetingData.id}
					/>
				</div>
			</div>
			<div className='border-t-2 border-gray-300 mt-10 p-5 h-screen bg-white'>
				<div className='mb-4 font-bold text-lg'>
					이용자들은 이 프로그램을 이렇게 느꼈어요!!
				</div>
				{isReviewLoading ? (
					<div className='text-center text-gray-500 mt-60'>
						리뷰를 불러오는 중...
					</div>
				) : !reviewsData || reviewsData.length === 0 ? (
					<div className=' text-gray-500 mt-60 text-center '>
						아직 작성된 리뷰가 없어요
					</div>
				) : (
					<Pagination
						currentData={reviewsData}
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				)}
			</div>
			<div className='fixed bottom-0 left-0 w-full '>
				<Footer createdBy={meetingData.createdBy} />
			</div>
		</div>
	);
}
