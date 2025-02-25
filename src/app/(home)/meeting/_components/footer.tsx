'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useGlobalModal } from '@/hooks/customs/useGlobalModal';
import { useRouter, useParams } from 'next/navigation';
import { participantsGroup } from '@/api/detail-meeting/participantsGroup';
import { useGroupActions } from '@/hooks/customs/useGroupActions';

export function Footer({
	createdBy,
	capacity,
	participantCount,
	updateParticipantCount,
}: {
	createdBy: number;
	capacity: number;
	participantCount: number;
	updateParticipantCount: (delta: number) => void;
}) {
	const [isJoinDisabled, setIsJoinDisabled] = useState(false);
	const [isOwner, setIsOwner] = useState(false);
	const [isDeadline, setIsDeadline] = useState(false);
	const userId = useAuthStore((state) => state.userId);
	const params = useParams();
	const [id, setId] = useState<number | null>(null);
	const { openModal, closeModal } = useGlobalModal();
	const router = useRouter();

	// 소유자 여부와 모집 마감 상태 설정
	useEffect(() => {
		setIsOwner(userId !== null && userId === createdBy);
		setIsDeadline(participantCount >= capacity);
	}, [userId, createdBy, capacity, participantCount]);

	useEffect(() => {
		if (params.id) {
			setId(Number(params.id));
		}
	}, [params.id]);

	// 참여 여부 확인
	useEffect(() => {
		const checkParticipation = async () => {
			if (userId && id) {
				try {
					const participants = await participantsGroup(id);
					const hasParticipated = participants.some(
						(participant: { userId: number }) => participant.userId === userId,
					);
					if (hasParticipated) {
						setIsJoinDisabled(true);
					}
				} catch (error) {
					console.error('참여자 목록 조회 실패:', error);
				}
			}
		};
		checkParticipation();
	}, [userId, id]);

	// 그룹 액션 훅 사용 (id가 존재할 때)
	const { join, leave, cancel } = useGroupActions(
		id as number,
		updateParticipantCount,
	);

	const handleJoinClick = async () => {
		if (userId === null) {
			openModal({
				content: '로그인이 필요해요',
				confirmType: 'Alert',
				buttonPosition: 'right',
				onConfirm: () => {
					closeModal();
					router.push('/login');
				},
			});
			return;
		}

		if (isJoinDisabled) {
			await leave();
			setIsJoinDisabled(false);
		} else {
			await join();
			setIsJoinDisabled(true);
		}
	};

	const handleCancelClick = async () => {
		await cancel();
	};

	const handleShareClick = () => {
		openModal({
			content: '공유 되었습니다',
			confirmType: 'Alert',
			buttonPosition: 'right',
			onConfirm: () => {
				closeModal();
				router.push('/');
			},
		});
	};

	return (
		<div>
			<div
				className={`flex p-3 md:justify-between shrink-0
					 bg-gray-100 border-t-2 border-black ${
							isOwner
								? 'gap-3 flex-wrap justify-center items-center'
								: 'justify-between flex-nowrap'
						} 2xl:px-96 xl:px-72 lg:px-64 md:px-36 xs:items-center`}
			>
				<div className='text-start xs:mb-2'>
					<div className='font-bold text-sm'>
						더 건강한 나와 팀을 위한 프로그램 🏃‍♂️
					</div>
					<div className='text-[10px] mt-[3px]'>
						모임을 공유해서 더 많은 사람들이 참여할 수 있도록 독려해봐요
					</div>
				</div>
				{isOwner ? (
					<div>
						<button
							onClick={handleCancelClick}
							className='px-5 py-2 border-[1px] border-orange-500 text-orange-500 rounded-xl font-bold text-sm mr-2'
						>
							취소하기
						</button>
						<button
							onClick={handleShareClick}
							className='px-5 py-2 bg-orange-600 text-white rounded-xl text-sm'
						>
							공유하기
						</button>
					</div>
				) : isDeadline ? (
					<div className='bg-gray-400 text-white px-5 py-2 rounded-xl text-sm transition-colors whitespace-nowrap max-h-[40px]'>
						참여하기
					</div>
				) : (
					<button
						onClick={handleJoinClick}
						className={`px-5 py-2 rounded-xl text-sm transition-colors whitespace-nowrap max-h-[40px] ${
							isJoinDisabled
								? 'border-orange-600 border text-orange-600 font-bold'
								: 'bg-orange-600 text-white'
						}`}
					>
						{isJoinDisabled ? '참여 취소하기' : '참여하기'}
					</button>
				)}
			</div>
		</div>
	);
}
