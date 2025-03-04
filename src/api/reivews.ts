/** 리뷰 작성 */

import { BASE_URL } from '@/constants';
import type { IReviewState } from '@/hooks/customs/useCreateReview';

export const createReview = async (
	meetingId: string,
	payload: Omit<IReviewState, 'valid'>,
) => {
	const { score, comment } = payload;
	/** token */
	const token = localStorage.getItem('authToken');

	if (!token) {
		throw new Error('token invalid');
	}

	const res = await fetch(`${BASE_URL}/reviews`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			gatheringId: meetingId,
			score,
			comment,
		}),
	});

	if (!res.ok) {
		const status = res?.status ?? '400';
		const error = await res?.json();

		switch (Number(status)) {
			case 401:
				throw new Error('token invalid');
			case 403:
			case 404:
			default:
				throw new Error(error.code);
		}
	} else {
		const data = await res.json();
		return data?.id;
	}
};
