/** 리뷰 작성 */

import { BASE_URL } from '@/constants';
import type { IReviewState } from '@/hooks/customs/useCreateReview';

export const createReview = async (
	meetingId: string,
	payload: Omit<IReviewState, 'valid'>,
) => {
	const { score, comment } = payload;

	try {
		/** token */
		const token = localStorage.getItem('authToken');

		if (!token) {
			throw new Error('invalid token');
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
			const error = await res?.json();
			throw new Error(error);
		} else {
			const data = await res.json();
			return data?.id;
		}
	} catch (e) {
		// console.error(e);
	}
};
