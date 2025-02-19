'use client';

import { ReactNode } from 'react';
import { Modal } from '../components/Modal/Modal';
import useModalStore from './modalStore';

export function ModalProvider({ children }: { children: ReactNode }) {
	const { isOpen, content, closeModal, noBackDrop } = useModalStore(); // 전역 모달 상태 구독

	return (
		<>
			{children}
			<Modal isOpen={isOpen} onClose={closeModal} noBackDrop={noBackDrop}>
				{content}
			</Modal>
		</>
	);
}
