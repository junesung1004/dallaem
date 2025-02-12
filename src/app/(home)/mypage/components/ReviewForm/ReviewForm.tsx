'use client';

import Dialog from '@/app/components/Dialog/Dialog';
import { useGlobalModal } from '@/app/hooks/useGlobalModal';
import { SyntheticEvent } from 'react';

function ReviewForm() {
	const { openModal } = useGlobalModal(); // 전역 모달 제어
	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
	};

	// 전역 모달 열기
	const handleShowGlobalModal = () => {
		openModal(
			<div>
				<h2>전역 모달</h2>
				<p>이 모달은 전역으로 관리됩니다!</p>
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
			</Dialog>
		</form>
	);
}

export default ReviewForm;
