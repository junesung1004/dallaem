import { BASE_URL } from '@/constants';

/**
 * 주어진 옵션 객체를 순회하면서 값이 true인 키-값 쌍을 쿼리 스트링 형식으로 반환합니다.
 * @param {Object.<string, boolean>} options - 키는 문자열이고 값은 불리언인 옵션 객체
 * @returns {string} - 값이 true인 키-값 쌍을 포함하는 쿼리 스트링
 */
function getTrueQueryParameters(options: {
	[key: string]: boolean;
}): string | null {
	const trueParameters = Object.entries(options)
		.filter(([key, value]) => value)
		.map(([key]) => `${key}=true`)
		.join('&');
	return trueParameters ? `?${trueParameters}` : null;
}

export const myMeetingService = {
	/** 나의 모임, 작성 가능한 리뷰 가져오는 api */
	async fetchMyMeetings<T>(options: {
		completed: boolean;
		reviewed: boolean;
		sortBy?: 'joinedAt';
	}): Promise<T> {
		/** authorize 구조 변경되면 개선할 부분 */
		const token =
			typeof window !== 'undefined' ? localStorage.getItem('authToken') : '';
		const params = getTrueQueryParameters({
			completed: options.completed,
			reviewed: options.reviewed,
		});

		const responseData = await fetch(
			`${BASE_URL}/gatherings/joined${params ?? '?'}${options.sortBy === 'joinedAt' ? '&sortBy=joinedAt&sortOrder=asc' : ''}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			},
		);

		// 에러 처리
		if (!responseData?.ok) {
			const status = responseData?.status ?? '400';

			switch (Number(status)) {
				case 401:
					throw new Error('token invalid');
			}
		}

		return responseData?.json() as T;
	},

	/** 내가 주최한 모임 가져오는 api */
	async fetchMyHostedMeetings<T>(userId?: string): Promise<T> {
		/** authorize 구조 변경되면 개선할 부분 */
		const token =
			typeof window !== 'undefined' ? localStorage.getItem('authToken') : '';
		/** userId 없을 시 에러 */
		if (!userId?.length) {
			throw new Error('id required');
		}

		const responseData = await fetch(
			`${BASE_URL}/gatherings/?createdBy=${userId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			},
		);

		// 에러인 경우
		if (!responseData?.ok) {
			throw new Error('request error');
		}

		return responseData?.json() as T;
	},
};
