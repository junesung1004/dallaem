import { BASE_URL, REVIEW_SCORES } from '@/constants';
import { GetReviewsParams, ReviewScore } from '@/types/reviewType';

export const getReviewScore = async ({
	gatheringId,
	type,
}: GetReviewsParams): Promise<ReviewScore> => {
	const params = new URLSearchParams();
	if (gatheringId) params.append('gatheringId', gatheringId);
	if (type) params.append('type', type);

	const res = await fetch(`${BASE_URL}/reviews/scores?${params.toString()}`, {
		method: 'GET',
	});

	if (!res.ok) {
		throw new Error(`${res.status}`);
	}
	const result = await res.json();
	return result.length === 0 ? { REVIEW_SCORES } : result;
};
