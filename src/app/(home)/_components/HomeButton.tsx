'use client';

import Button from '@/components/Button/Button';
import { useGlobalModal } from '@/hooks/customs/useGlobalModal';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function HomeButton() {
	const router = useRouter();
	const userId = useAuthStore((state) => state.userId);
	const { openModal, closeModal } = useGlobalModal();

	useEffect(() => {}, [userId]);

	const clickCreateMeetingModalHandler = () => {
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
		} else {
			router.push('/createmodal');
		}
	};
	return <Button onClick={clickCreateMeetingModalHandler}>모임 만들기</Button>;
}
