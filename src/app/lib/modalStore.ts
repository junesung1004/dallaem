import { create } from 'zustand';

interface ModalState {
	isOpen: boolean;
	content: React.ReactNode | null;
	noBackDrop: boolean;
	openModal: (content: React.ReactNode, noBackDrop?: boolean) => void;
	closeModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
	isOpen: false,
	content: null,
	noBackDrop: false,
	openModal: (content: React.ReactNode, noBackDrop?: boolean) =>
		set({ isOpen: true, content, noBackDrop }), // 전역 모달 열기
	closeModal: () => set({ isOpen: false, content: null }), // 전역 모달 닫기
}));

export default useModalStore;
