'use client';

import Button from '@/app/components/Button/Button';
import Dialog from '@/app/components/Dialog/Dialog';
import { useGlobalModal } from '@/app/hooks/useGlobalModal';
import { useRouter } from 'next/navigation';
import { SyntheticEvent } from 'react';

function ReviewForm() {
	const { openModal, closeModal } = useGlobalModal(); // 전역 모달 제어
	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
	};

	const router = useRouter();

	// 전역 모달 열기
	const handleShowGlobalModal = () => {
		openModal(
			<div className='p-4'>
				정말 나가시겠어요?
				<Button
					state='default'
					isOutlined={false}
					onClick={() => {
						router.back();
						closeModal();
					}}
				>
					확인
				</Button>
				<Button state='default' isOutlined={true} onClick={() => {}}>
					취소
				</Button>
			</div>,
			true,
		);
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
					<Dialog.Button
						type='yes'
						text='저장'
						onClick={() => {}}
					></Dialog.Button>
					<Dialog.Button
						type='no'
						text='취소'
						onClick={() => {
							handleShowGlobalModal();
						}}
					></Dialog.Button>
				</Dialog.ButtonContainer>
			</Dialog>
		</form>
	);
}

export default ReviewForm;
