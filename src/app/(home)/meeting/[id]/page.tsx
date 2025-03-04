'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { MeetingCard } from '@/app/(home)/meeting/_components/MeetingCard';
import { DeadlineBadge } from '@/components/Badge/DeadlineBadge';
import { Footer } from '../_components/footer';
import { Pagination } from '../_components/Pagination';
import Image from 'next/image';
import useDetailMeetingData from '@/hooks/query/useDetailMeetingData';
import useDetailReviewData from '@/hooks/query/useDetailReviewData';
import { useQueryClient } from '@tanstack/react-query';

export default function DetailPage() {
	const params = useParams();
	const id = params.id as string;
	const limit = 4;
	const [currentPage, setCurrentPage] = useState(1);
	const queryClient = useQueryClient();

	const {
		data: meetingData,
		isLoading: isMeetingLoading,
		isError: isMeetingError,
		error: meetingError,
	} = useDetailMeetingData(id);

	const {
		data: reviewData,
		isLoading: isReviewLoading,
		isError: isReviewError,
		error: reviewError,
	} = useDetailReviewData({ gatheringId: id, limit, currentPage });

	const handlePageChange = (page: number) => {
		if (page >= 1) {
			setCurrentPage(page);
		}
	};

	// API 호출 없이 클라이언트에서 참가자 수를 계산해 캐시를 업데이트하는 함수
	const updateParticipantCount = (delta: number) => {
		queryClient.setQueryData(['detailMeeting', id], (prev: any) => {
			if (prev) {
				return {
					...prev,
					participantCount: prev.participantCount + delta,
				};
			}
			return prev;
		});
	};

	if (isMeetingLoading) {
		return <div>모임 데이터를 불러오는 중...</div>;
	}
	if (isMeetingError || !meetingData) {
		return (
			<div>
				모임 데이터를 불러오는 데 실패했습니다:{' '}
				{meetingError instanceof Error ? meetingError.message : 'Unknown Error'}
			</div>
		);
	}

	const reviews = reviewData?.data || [];
	const totalPages = Math.ceil((reviewData?.totalItemCount || 0) / limit);
	const isFuture = new Date(meetingData.dateTime) < new Date();

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
						participantCount={meetingData.participantCount}
						capacity={meetingData.capacity}
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
				) : isReviewError ? (
					<div className='text-center text-gray-500 mt-60'>
						리뷰를 불러오는 데 실패했습니다:{' '}
						{reviewError instanceof Error
							? reviewError.message
							: 'Unknown Error'}
					</div>
				) : reviews.length === 0 ? (
					<div className='text-center text-gray-500 mt-60'>
						아직 작성된 리뷰가 없어요
					</div>
				) : (
					<Pagination
						currentData={reviews}
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				)}
			</div>
			{!isFuture && (
				<div className='fixed bottom-0 left-0 w-full'>
					<Footer
						createdBy={meetingData.createdBy}
						capacity={meetingData.capacity}
						participantCount={meetingData.participantCount}
						updateParticipantCount={updateParticipantCount}
					/>
				</div>
			)}
		</div>
	);
}
