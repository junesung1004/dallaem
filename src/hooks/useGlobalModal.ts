import { useRouter } from 'next/navigation';
import useModalStore from '../lib/modalStore';

export function useGlobalModal() {
	// 라우터가 있는 모달일 경우의 닫기를 고려
	const router = useRouter();
	const openModal = useModalStore((state) => state.openModal);
	const closeModal = useModalStore((state) => state.closeModal);

	const closeAllModal = () => {
		router.back(); // 브라우저 뒤로가기
		closeModal(); // 모달 닫기
	};

	return { openModal, closeModal, closeAllModal };
}
