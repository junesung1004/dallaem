import { FilterContextType } from '@/types/filterType';

export const getMeetingInfiniteData = async ({
	pageParam = 3,
	filters,
}: {
	pageParam: number;
	filters: FilterContextType;
}) => {
	const limit = 3;
	const offset = pageParam;

	const params = new URLSearchParams();
	if (filters.type) params.append('type', filters.type);
	if (filters.location) params.append('location', filters.location);
	if (filters.date) params.append('date', filters.date);
	if (filters.sortBy) params.append('sortBy', filters.sortBy);
	if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/gatherings?limit=${limit}&offset=${offset}&${params.toString()}`,
		);
		if (!res.ok) {
			throw new Error(`서버 오류 : ${res.status} ${res.statusText}`);
		}

		const data = await res.json();

		const filteredData = data.filter(
			(item: { image: string | null }) => item.image !== null,
		);

		const nextOffset = filteredData.length > 0 ? pageParam + limit : undefined;

		return { data: filteredData, nextOffset };
	} catch (error) {
		console.error('모임 목록 api 호출 에러 : ', error);
	}
};

/** 찜한 페이지 data 가져오기 */
export const getFavoriteMeetingData = async (filters: {
	type: string;
	id: string;
}) => {
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
