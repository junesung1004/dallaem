'use client';

import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStore } from '@/store/useAuthStore';
import { useGlobalModal } from '@/hooks/customs/useGlobalModal';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { joinGroup } from '@/api/detail-meeting/joinGroup';

export function Footer({ createdBy }: { createdBy: number }) {
	const [isJoinDisabled, setIsJoinDisabled] = useState(false);
	const [isOwner, setIsOwner] = useState(false);
	const userId = useStore((state) => state.userId);
	const params = useParams();
	const [id, setId] = useState<number | null>(null);
	const { openModal } = useGlobalModal();
	const router = useRouter();

	useEffect(() => {
		setIsOwner(userId !== null && userId === createdBy);
	}, [userId, createdBy]);

	useEffect(() => {
		if (params.id) {
			setId(Number(params.id));
		}
	}, [params.id]);

	const handleJoinClick = async () => {
		if (userId === null) {
			openModal({
				content: '로그인이 필요해요',
				confirmType: 'Alert',
				buttonPosition: 'right',

				onConfirm: () => router.push('/login'),
			});
		} else {
			try {
				await joinGroup(Number(id));
				setIsJoinDisabled(true);
				openModal({
					content: '참여 완료했습니다',
					confirmType: 'Alert',
					buttonPosition: 'right',
					onConfirm: () => console.log('참여완료'),
				});
			} catch (error) {
				const errorMessage = (error as Error).message.replace(/^Error:\s*/, '');
				openModal({
					content: `${errorMessage}`,
					confirmType: 'Alert',
					buttonPosition: 'right',

					onConfirm: () => console.log('참여 중 오류 발생', error),
				});
			}
		}
	};

	const handleCancelClick = () => {
		toast.info('취소요~');
	};

	const handleShareClick = () => {
		toast.success('공유완료~');
	};

	return (
		<div>
			<div
				className={`flex p-3 md:justify-between shrink-0
					 bg-gray-100 border-t-2 border-black ${isOwner ? 'gap-3 flex-wrap justify-center items-center' : 'justify-between flex-nowrap'} 2xl:px-96 xl:px-72 lg:px-64 md:px-36 xs:items-center`}
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
				) : (
					<button
						onClick={handleJoinClick}
						disabled={isJoinDisabled}
						className={`px-5 py-2 rounded-xl text-sm transition-colors whitespace-nowrap max-h-[40px] ${
							isJoinDisabled
								? 'bg-gray-400 text-white cursor-not-allowed'
								: 'bg-orange-600 text-white'
						}`}
					>
						참여하기
					</button>
				)}
			</div>

			<ToastContainer />
		</div>
	);
}
