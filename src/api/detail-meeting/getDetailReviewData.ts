export const getDetailReviewData = async (
	id: string,
	limit: number,
	page: number,
) => {
	try {
		const offset = (page - 1) * limit;
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/7/reviews?gatheringId=${id}&limit=${limit}&offset=${offset}`,
		);

		if (!res.ok) {
			throw new Error(`서버 오류: ${res.status} ${res.statusText}`);
		}

		const data = await res.json();
		return {
			data: data.data,
			totalItemCount: data.totalItemCount,
		};
	} catch (error) {
		console.log(`상세 페이지 리뷰 데이터 가져오기 실패:`, error);
		return { data: [], totalItemCount: 0 };
	}
};
