'use client';

import Dialog from '@/components/Dialog/Dialog';
import { useGlobalModal } from '@/hooks/customs/useGlobalModal';
import { SyntheticEvent } from 'react';

function ReviewForm() {
	const { openModal, closeAllModal } = useGlobalModal(); // 전역 모달 제어
	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
	};

	// 전역 모달 열기
	const handleShowGlobalModal = () => {
		openModal({
			content: '정말로 나가시겠습니까?',
			confirmType: 'Alert',
			onConfirm: closeAllModal,
			buttonPosition: 'right',
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<Dialog>
				<Dialog.Content title='리뷰쓰기'>
					<span>만족스러운 경험이었나요?</span>
					<span>하트하트</span>
					<span>경험 남겨주세요</span>
					<textarea defaultValue={'경험'}></textarea>
				</Dialog.Content>
				<Dialog.ButtonContainer>
					<Dialog.Button type='yes' onClick={() => {}}>
						저장
					</Dialog.Button>
					<Dialog.Button
						type='no'
						onClick={() => {
							handleShowGlobalModal();
						}}
					>
						취소
					</Dialog.Button>
				</Dialog.ButtonContainer>
			</Dialog>
		</form>
	);
}

export default ReviewForm;
