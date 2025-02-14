import { create } from 'zustand';
import type { ModalContentProps } from '../components/Modal/ModalContent';
import ModalContent from '../components/Modal/ModalContent';

interface ModalState {
	isOpen: boolean;
	content: React.ReactNode | null;
	noBackDrop: boolean;
	openModal: (modalOption: ModalOption) => void;
	closeModal: () => void;
}

interface ModalOption extends ModalContentProps {
	noBackDrop?: boolean;
}

const useModalStore = create<ModalState>((set) => ({
	isOpen: false,
	content: null,
	noBackDrop: false,
	openModal: (modalOption: ModalOption) =>
		set({
			isOpen: true,
			content: <ModalContent {...modalOption} key={1} />,
			noBackDrop: modalOption.noBackDrop,
		}), // 전역 모달 열기
	closeModal: () => set({ isOpen: false, content: null }), // 전역 모달 닫기
}));

export default useModalStore;
