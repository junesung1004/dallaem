'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useGlobalModal } from '@/hooks/customs/useGlobalModal';
import { useRouter, useParams } from 'next/navigation';
import useParticipantsData from '@/hooks/query/useParticipantsData';
import { useGroupMutations } from '@/hooks/mutation/useGroupMutations';
import Button from '@/components/Button/Button';

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
	const [id, setId] = useState<number | null>(null);

	const userId = useAuthStore((state) => state.userId);
	const { openModal, closeModal } = useGlobalModal();
	const router = useRouter();
	const params = useParams();
	const { data: participants, isLoading } = useParticipantsData(id);

	useEffect(() => {
		if (params.id) {
			setId(Number(params.id));
		}
	}, [params.id]);

	// 소유자 여부와 모집 마감 상태 설정
	useEffect(() => {
		setIsOwner(userId !== null && userId === createdBy);
		setIsDeadline(participantCount >= capacity);
	}, [userId, createdBy, capacity, participantCount]);

	// 참여 여부 확인
	useEffect(() => {
		if (!isLoading && participants && userId) {
			const hasParticipated = participants.some(
				(p: { userId: number }) => p.userId === userId,
			);
			if (hasParticipated) {
				setIsJoinDisabled(true);
			}
		}
	}, [isLoading, participants, userId]);

	// 참가, 참가 취소, 모집공고 취소
	const { joinMutation, leaveMutation, cancelMutation } = useGroupMutations({
		groupId: id ?? 0,
		onSuccessJoin: () => {
			updateParticipantCount(1);
			openModal({
				content: '참여 완료했습니다',
				confirmType: 'Alert',
				buttonPosition: 'right',
				onConfirm: closeModal,
			});
		},
		onSuccessLeave: () => {
			updateParticipantCount(-1);
			openModal({
				content: '참여가 취소되었습니다',
				confirmType: 'Alert',
				buttonPosition: 'right',
				onConfirm: closeModal,
			});
		},
		onSuccessCancel: () => {
			openModal({
				content: '모집 공고가 취소되었습니다',
				confirmType: 'Alert',
				buttonPosition: 'right',
				onConfirm: () => {
					closeModal();
					router.push('/');
				},
			});
		},
		onError: (error) => {
			openModal({
				content:
					error instanceof Error ? error.message : '에러가 발생했습니다.',
				confirmType: 'Alert',
				buttonPosition: 'right',
				onConfirm: closeModal,
			});
		},
	});

	//  참여하기/취소하기 버튼 클릭 핸들러
	const handleJoinClick = () => {
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
			leaveMutation.mutate();
			setIsJoinDisabled(false);
		} else {
			joinMutation.mutate();
			setIsJoinDisabled(true);
		}
	};

	const handleCancelClick = () => {
		cancelMutation.mutate();
	};

	const handleShareClick = () => {
		openModal({
			content: '공유 되었습니다',
			confirmType: 'Alert',
			buttonPosition: 'right',
			onConfirm: () => {
				closeModal();
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
						<Button
							onClick={handleCancelClick}
							className='px-5 py-2 border-[1px] border-secondary-700 text-secondary-500 rounded-xl font-bold text-sm mr-2 text-secondary-700'
						>
							취소하기
						</Button>
						<Button
							onClick={handleShareClick}
							className='px-5 py-2 bg-secondary-600 text-white rounded-xl text-sm'
						>
							공유하기
						</Button>
					</div>
				) : isDeadline ? (
					<div className='bg-gray-400 text-white px-5 py-2 rounded-xl text-sm transition-colors whitespace-nowrap max-h-[40px]'>
						참여하기
					</div>
				) : (
					<div>
						<Button
							onClick={handleJoinClick}
							className={`px-5 py-2 rounded-xl text-sm transition-colors whitespace-nowrap max-h-[40px] ${
								isJoinDisabled
									? 'border-secondary-600 border text-secondary-600 font-bold'
									: 'bg-secondary-600 text-white'
							}`}
						>
							{isJoinDisabled ? '참여 취소하기' : '참여하기'}
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
