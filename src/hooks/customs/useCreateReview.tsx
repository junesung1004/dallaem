'use client';

import { useState } from 'react';
import { useGlobalModal } from './useGlobalModal';
import { useParams, useRouter } from 'next/navigation';
import { createReview } from '@/api/reivews';

export interface IReviewState {
	valid: boolean;
	comment: string;
	score: number;
}

export function useCreateReview(initialState: IReviewState) {
	const [state, setState] = useState(initialState);
	const { openModal, closeModal, closeAllModal } = useGlobalModal(); // 전역 모달 제어
	const params = useParams<{ id: string }>();
	const router = useRouter();

	/** 유효성 검사 */
	const validate = (
		name: string,
		value: string | number,
		prev: IReviewState,
	) => {
		let valid = false;

		// 평점 0점 이상
		if (name === 'score') {
			valid =
				typeof value === 'number' && value > 0 && prev.comment?.length > 0;
		}

		// 빈 문자열 유효성 검사
		if (name === 'comment' && typeof value === 'string') {
			valid = value.trim().length > 0 && prev.score > 0;
		}

		return valid;
	};

	// 공통 핸들러 함수
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.currentTarget;
		const nextValue = name === 'score' ? Number(value) : value;

		setState((prevState) => {
			const valid = validate(name, nextValue, prevState);
			return {
				...prevState,
				valid,
				[name]: nextValue,
			};
		});
	};

	// form submit 핸들러 함수
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const res = await createReview(params?.id, state);
			if (res) {
				closeAllModal();
			}
		} catch (e) {
			if (!(e instanceof Error)) {
				console.error('Unknown error');
				return null;
			}

			switch (e.message) {
				case 'token invalid':
					openModal({
						content: (
							<span>
								로그인이 만료되었습니다.
								<br />
								로그인 페이지로 이동합니다
							</span>
						),
						confirmType: 'Alert',
						onConfirm: () => {
							closeAllModal();
							router.push('/login');
						},
					});
					break;
				case 'FORBIDDEN':
					openModal({
						content: (
							<span>
								모임에 참여하지 않아 리뷰를 작성할 수 없어요
								<br />
								작성 중인 내용을 모두 삭제하고 나가시겠어요?
							</span>
						),
						confirmType: 'Alert',
						onConfirm: () => {
							closeAllModal();
						},
						onDismiss: closeModal,
					});
					break;
				case 'NOT_FOUND':
					openModal({
						content: (
							<span>
								모임을 찾을 수 없습니다.
								<br />
								작성 중인 내용을 모두 삭제하고 나가시겠어요?
							</span>
						),
						confirmType: 'Confirm',
						onConfirm: () => {
							closeAllModal();
						},
						onDismiss: closeModal,
					});
					break;
				case 'ALREADY_REVIEWED':
					openModal({
						content: (
							<span>
								이 모임에 이미 작성한 리뷰가 있어
								<br />
								새로운 리뷰를 남길 수 없어요
								<br />
								작성 중인 내용을 모두 삭제하고 나가시겠어요?
							</span>
						),
						confirmType: 'Confirm',
						onConfirm: () => {
							closeAllModal();
						},
						onDismiss: closeModal,
					});
					break;

				default:
					console.error(e);
					openModal({
						content: '문제가 발생하였습니다. 다시 시도해주세요',
						confirmType: 'Alert',
						onConfirm: () => {
							closeAllModal();
						},
					});
			}
		}
	};

	// 작성 중간에 이탈 시 실행 함수
	const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		// 작성된 내용이 있을 때만 표시
		if (state.score !== 0 || state.comment?.trim()?.length !== 0) {
			openModal({
				content: (
					<>
						정말 나가시겠어요?
						<br />
						작성된 내용이 모두 삭제됩니다.
					</>
				),
				confirmType: 'Alert',
				onConfirm: closeAllModal,
				buttonPosition: 'right',
			});
		} else {
			closeAllModal();
		}
	};

	return { state, handleChange, handleSubmit, handleClose };
}
