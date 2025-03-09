import { BASE_URL } from '@/constants';
import { MyMeeting } from '@/types/meetingsType';

interface FetchOptions {
	headers: {
		Authorization: string;
	};
}

interface ParamsOptions extends Record<string, string | undefined> {
	completed?: 'true' | 'false';
	reviewed?: 'true' | 'false';
	sortBy?: 'joinedAt';
}

function toQueryParams(params: ParamsOptions): string {
	const filteredParams = Object.entries(params)
		.filter(([_, value]) => value !== undefined) // undefined 제거
		.map(([key, value]) => [key, String(value)]); // 값들을 string으로 변환

	return new URLSearchParams(filteredParams as string[][]).toString();
}

export const fetchMyMeetings = async (
	params: ParamsOptions,
	options: FetchOptions,
): Promise<MyMeeting[]> => {
	const url = `${BASE_URL}/gatherings/joined`;
	const meetingParams = toQueryParams(params);
	const res = await fetch(
		meetingParams ? `${url}?${meetingParams}` : url,
		options,
	);

	if (!res.ok) {
		/**
		 * 향후 에러 공통화 되면 수정할 부분
		 */
		const error = await res.json();
		console.error(error.message);
		throw new Error(error?.code);
	}
	return res.json();
};

export const fetchMyHostedMeetings = async () => {
	return;
};
