import { BASE_URL } from '@/constants';
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
	return result.length === 0
		? {
				teamId: '7',
				averageScore: 0,
				fiveStars: 0,
				fourStars: 0,
				threeStars: 0,
				twoStars: 0,
				oneStar: 0,
				type: type,
			}
		: result[0];
};
