import { BASE_URL } from '@/constants';
import { ReviewQueryType } from '@/types/reviewType';

export const reviewService = {
	async getDetailReviewData(option: ReviewQueryType) {
		const params = new URLSearchParams();
		Object.entries(option).forEach(([key, value]) => {
			if (['limit', 'offset', 'currentPage'].includes(key)) {
				return true;
			}
			params.append(key, String(value));
		});

		const paramsValue = params.toString();

		try {
			const currentPage = option.currentPage || 1;
			const limit = option.limit || 4;
			const offset = (currentPage - 1) * limit;

			const res = await fetch(
				`${BASE_URL}/reviews?${paramsValue}&limit=${limit}&offset=${offset}`,
			);

			if (!res.ok) {
				throw new Error(`서버 오류: ${res.status} ${res.statusText}`);
			}

			const data = await res.json();
			return {
				data: data.data,
				totalItemCount: data.totalItemCount,
				totalPages: data.totalPages,
				currentPage: data.currentPage,
			};
		} catch (error) {
			console.log(`상세 페이지 리뷰 데이터 가져오기 실패:`, error);
			return { data: [], totalItemCount: 0 };
		}
	},
};
