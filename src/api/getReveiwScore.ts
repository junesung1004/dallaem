import { BASE_URL } from '@/constants';
import { GetReviewsParams, ReviewScore } from '@/types/reviewType';

export const getReviewScore = async ({
	gatheringId,
	type,
}: GetReviewsParams): Promise<ReviewScore[]> => {
	const params = new URLSearchParams();
	if (gatheringId) params.append('gatheringId', gatheringId);
	if (type) params.append('type', type);

	const res = await fetch(`${BASE_URL}/reviews/scores?${params.toString()}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!res.ok) {
		throw new Error(`${res.status}`);
	}

	return res.json();
};
