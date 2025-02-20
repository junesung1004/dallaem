import { ReviewQueryType } from '@/types/reviewType';

export const reviewService = {
	async getDetailReviewData(option: ReviewQueryType) {
		try {
			const offset = (option.currentPage ?? 1 - 1) * (option.limit ?? 10);
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/reviews?gatheringId=${option.gatheringId}&limit=${option.limit}&offset=${offset}`,
			);

			if (!res.ok) {
				throw new Error(`서버 오류: ${res.status} ${res.statusText}`);
			}

			const data = await res.json();
			console.log('ddd', data);
			return {
				data: data.data,
				totalItemCount: data.totalItemCount,
			};
		} catch (error) {
			console.log(`상세 페이지 리뷰 데이터 가져오기 실패:`, error);
			return { data: [], totalItemCount: 0 };
		}
	},
};
