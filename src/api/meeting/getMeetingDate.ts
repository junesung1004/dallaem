import { FilterType } from '@/types/filterType';

export const getMeetingInfiniteData = async ({
	pageParam = 1,
	filters,
}: {
	pageParam: number;
	filters: FilterType;
}) => {
	const limit = 5;
	const offset = Math.max((pageParam - 1) * limit, 0);

	const params = new URLSearchParams();
	if (filters?.type) params.append('type', filters.type);
	if (filters?.location) params.append('location', filters.location);
	if (filters?.date) params.append('date', filters.date);
	if (filters?.sortBy) params.append('sortBy', filters.sortBy);
	if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);

	try {
		const res = await fetch(
			`${process.env.BASE_URL}/gatherings?limit=${limit}&offset=${offset}&${params.toString()}`,
		);
		if (!res.ok) {
			const errorMessage = await res.text(); // 텍스트로 에러 메시지 확인
			console.error(`Error status: ${res.status} ${res.statusText}`);
			console.error('Error details:', errorMessage);

			throw new Error(`서버 오류 : ${res.status} ${res.statusText}`);
		}

		const data = await res.json();

		const nextOffset = data.length >= limit ? pageParam + 1 : undefined;

		return { data: data, nextOffset };
	} catch (error) {
		console.error('모임 목록 api 호출 에러 : ', error);
		return { data: [], nextOffset: undefined };
	}
};

/** 찜한 페이지 data 가져오기 */
export const getFavoriteMeetingData = async (filters: { id: string }) => {
	const queryParams = new URLSearchParams(filters);
	try {
		const res = await fetch(
			`${process.env.BASE_URL}/gatherings?${queryParams.toString()}`,
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
