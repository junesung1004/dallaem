'use client';

import { useGlobalModal } from '@/app/hooks/useGlobalModal';

function GlobalModal() {
	const { openModal } = useGlobalModal();
	return (
		<button
			className='bg-orange-600 text-white'
			onClick={() => {
				openModal(
					<div>
						이 모달은 라우트 없이 전역 상태로만 관리되는 모달입니다 뒤로가기하면
						페이지가 전체 뒤로가기가 됩니다
					</div>,
				);
			}}
		>
			Open Modal with no routes
		</button>
	);
}

export default GlobalModal;
