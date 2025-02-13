'use client';

import Button from '@/app/components/Button/Button';
import { useGlobalModal } from '@/app/hooks/useGlobalModal';
import { useRouter } from 'next/navigation';

function GlobalModal() {
	const { openModal, closeModal } = useGlobalModal();
	const router = useRouter();

	return (
		<button
			className='bg-orange-600 text-white'
			onClick={() => {
				openModal(
					<div className='p-4'>
						로그인이 필요해요. 로그인하시겠습니까?
						<Button
							state='default'
							isOutlined={false}
							onClick={() => {
								closeModal();
								router.push('/login');
							}}
						>
							확인
						</Button>
						<Button
							state='default'
							isOutlined={true}
							onClick={() => {
								closeModal();
							}}
						>
							취소
						</Button>
					</div>,
					false,
				);
			}}
		>
			Open Modal with no routes
		</button>
	);
}

export default GlobalModal;
