'use client';

import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Footer({ createdBy }: { createdBy: number }) {
	const [userId, setUserId] = useState<string | null>(null);
	const [isOwner, setIsOwner] = useState(false);
	const [isJoinDisabled, setIsJoinDisabled] = useState(false);

	useEffect(() => {
		const storedUserId = localStorage.getItem('userId');
		setUserId(storedUserId);

		if (storedUserId && Number(storedUserId) === createdBy) {
			setIsOwner(true);
		}
	}, [createdBy]);

	const handleJoinClick = () => {
		if (!userId) {
			toast.error('로그인하세요~');
		} else {
			toast.success('참여했습니다~');
			setIsJoinDisabled(true);
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
				className={`flex justify-between p-3 bg-gray-100 md:flex-row ${isOwner ? 'xs:flex-col ' : ''} 2xl:px-96 xl:px-72 lg:px-64 md:px-36 xs:items-center`}
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
						className={`px-5 py-2 rounded-xl text-sm transition-colors ${
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
