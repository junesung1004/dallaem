'use client';

import Button from '@/app/components/Button/Button';
import { useGlobalModal } from '@/app/hooks/useGlobalModal';
import { useRouter } from 'next/navigation';

function GlobalModal() {
	const { openModal, closeModal } = useGlobalModal();
	const router = useRouter();

	return (
		<Button
			state='default'
			isOutlined={false}
			onClick={() => {
				openModal({
					content: (
						<span>
							로그인이 필요해요. <br />
							로그인 하시겠습니까?
						</span>
					),
					confirmType: 'Confirm',
					buttonPosition: 'right',
					onConfirm: () => {
						router.push('/login');
						closeModal();
					},
				});
			}}
		>
			Open Modal with no routes
		</Button>
	);
}

export default GlobalModal;
