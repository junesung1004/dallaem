import { getMeetingParamsType } from '@/types/meetingsType';

export const getMeetingData = async ({
	type,
	location,
	sortBy,
	sortOrder,
	limit = 30,
	offset = 12,
}: getMeetingParamsType) => {
	try {
		const queryParams = new URLSearchParams();

		if (type) queryParams.append('type', type);
		if (location) queryParams.append('location', location);
		if (sortBy) queryParams.append('sortBy', sortBy);
		if (sortOrder) queryParams.append('sortOrder', sortOrder);

		queryParams.append('limit', limit.toString());
		queryParams.append('offset', offset.toString());

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

/** 찜한 페이지 data 가져오기 */
export const getFavoriteMeetingData = async (filters) => {
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
