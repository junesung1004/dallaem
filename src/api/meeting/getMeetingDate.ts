import { MeetingQueryType } from '@/types/meetingsType';

export const getMeetingInfiniteData = async (option: MeetingQueryType) => {
	const params = new URLSearchParams();

	//option 객체에서 limit, offset, currentPage 제외하고 params에 추가
	Object.entries(option).forEach(([key, value]) => {
		if (['limit', 'offset', 'currentPage'].includes(key)) {
			return; // 필터링
		}
		params.append(key, String(value));
	});

	try {
		const currentPage = option.currentPage || 1;
		const limit = option.limit || 4;
		const offset = (currentPage - 1) * limit;

		// URL 생성 시 params.toString()을 사용
		const url = `${process.env.NEXT_PUBLIC_BASE_URL}/gatherings?${params.toString()}&limit=${limit}&offset=${offset}`;

		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`서버 오류: ${res.status} ${res.statusText}`);
		}

		const data = await res.json();
		//console.log('data1 : ', data);
		return {
			data: data.results,
			totalItemCount: data.totalItemCount,
			totalPages: data.totalPages,
			currentPage: data.currentPage,
		};
	} catch (error) {
		console.log('상세 페이지 리뷰 데이터 가져오기 실패:', error);
		return { data: [], totalItemCount: 0 };
	}
};

/** 찜한 페이지 data 가져오기 */
export const getFavoriteMeetingData = async (filters: { id: string }) => {
	const queryParams = new URLSearchParams(filters);
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/gatherings?${queryParams.toString()}`,
		);

		if (!res.ok) {
			throw new Error(`서버 오류: ${res.status} ${res.statusText}`);
		}

		const data = await res.json();

		const filteredData = data.filter(
			(item: { image: string | null }) => item.image !== null,
		);
		return filteredData;
	} catch (error) {
		console.error('미팅 목록 가져오기 실패:', error);
		return null;
	}
};
