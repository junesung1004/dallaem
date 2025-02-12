import useModalStore from '../lib/modalStore';

export function useGlobalModal() {
	const openModal = useModalStore((state) => state.openModal);
	const closeModal = useModalStore((state) => state.closeModal);

	return { openModal, closeModal };
}
