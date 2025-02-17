'use client';

import { useState } from 'react';
import { useGlobalModal } from './useGlobalModal';
import { useParams } from 'next/navigation';
import { createReview } from '@/api/reivews';

export interface IReviewState {
	valid: boolean;
	comment: string;
	score: number;
}

export function useCreateReview(initialState: IReviewState) {
	const [state, setState] = useState(initialState);
	const { openModal, closeAllModal } = useGlobalModal(); // 전역 모달 제어
	const params = useParams<{ id: string }>();

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
		const res = await createReview(params?.id, state);
		if (res) {
			closeAllModal();
		}

		// const formData = new FormData(e.currentTarget);

		// for (const [name, value] of formData) {
		// 	console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
		// }
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
