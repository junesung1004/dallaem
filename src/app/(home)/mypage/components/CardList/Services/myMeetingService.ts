import {
	fetchMyMeetings as api,
	fetchMyHostedMeetings as aapi,
} from '@/api/meeting/myMeeting';
import { getUserInfo } from '@/api/users';
import { BASE_URL } from '@/constants';
import { reviewService } from '@/service/reviewService';
import { MyMeeting, MyMeetingCardType } from '@/types/meetingsType';
import { IReviewData } from '@/types/reviewType';
interface meetingOptions {
	headers: {
		Authorization: string;
	};
}

export const myMeetingService = {
	/** 나의 모임, 작성 가능한 리뷰 가져오는 api */
	// 더이상 사용하지 않는 api
	async fetchMyMeetings<T>(options: {
		completed?: boolean;
		reviewed?: boolean;
		sortBy?: 'joinedAt';
	}): Promise<T> {
		/** authorize 구조 변경되면 개선할 부분 */
		const token =
			typeof window !== 'undefined' ? localStorage.getItem('authToken') : '';
		const params = '';

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

	// 나의 모임 : 모임 날짜가 남은 아이템이 먼저 배치되도록 정렬
	async getMyMeetings(options: meetingOptions): Promise<MyMeeting[] | null> {
		// 모임 날짜가 남은 순으로 정렬하기 위함
		const params = {
			sortBy: 'joinedAt' as const,
			limit: 40,
		};

		try {
			const meetings = await api(params, options);

			// meetings 가 없다면
			if (!meetings) return null;

			// 취소되지 않은 모임만 보이기
			const unCancelMeetings = meetings.filter((item) => !item.canceledAt);

			/** 참여하지 않은 항목이 상단으로 */
			const sortedMeetings = unCancelMeetings?.sort((a, b) => {
				if (a.isCompleted !== b.isCompleted) {
					return a.isCompleted ? 1 : -1;
				}
				return 0;
			});
			return sortedMeetings || null;
		} catch (e) {
			// 호출 컴포넌트에 에러처리 위임
			throw new Error(e as string);
		}
	},

	// 작성 가능한 리뷰
	async getMyCompletedMeetings(
		options: meetingOptions,
	): Promise<MyMeeting[] | null> {
		const params = {
			completed: 'true' as const,
			reviewed: 'false' as const,
		};

		try {
			const meetings = await api(params, options);
			// meetings 가 없다면
			if (!meetings) return null;
			return meetings.filter((item) => !item.canceledAt);
		} catch (e) {
			// 호출 컴포넌트에 에러처리 위임
			throw new Error(e as string);
		}
	},

	// 내가 만든 모임
	async getMyHostedMeetings(
		options: meetingOptions,
	): Promise<MyMeeting[] | null> {
		// userId 얻어오기
		const userInfo = await getUserInfo(options);
		const userId = userInfo?.id;

		if (!userId) return null;

		const params = {
			createdBy: userId,
		};

		try {
			const meetings = aapi(params, options);

			// meetings 가 없다면
			if (!meetings) return null;
			return meetings;
		} catch (e) {
			// 호출 컴포넌트에 에러처리 위임
			throw new Error(e as string);
		}
	},

	// 내가 작성한 리뷰
	async getMyReviews(options: meetingOptions): Promise<IReviewData[] | null> {
		// userId 얻어오기
		const userInfo = await getUserInfo(options);
		const userId = userInfo?.id;

		if (!userId) return null;

		const params = {
			userId,
		};

		try {
			const { data } = await reviewService.getDetailReviewData(params);
			const reviews = data;

			// reviews 가 없다면
			if (!reviews) return null;
			return reviews;
		} catch (e) {
			// 호출 컴포넌트에 에러처리 위임
			throw new Error(e as string);
		}
	},

	// 리뷰 가능 여부/취소 가능 여부 업데이트하여 반환하는 함수
	async getMarkedMyMeetings(
		options: meetingOptions,
	): Promise<MyMeetingCardType[] | null> {
		const userInfo = await getUserInfo(options);
		const userId = userInfo?.id;

		if (!userId) return null;

		const getMeetings = async function () {
			return await myMeetingService.getMyMeetings(options);
		};

		const myMeetings = await getMeetings();

		if (!myMeetings) return null;

		const markedMeetings = myMeetings.map((meeting) => ({
			...meeting,
			canReview: meeting.isReviewed ? false : true,
			canLeave: meeting.createdBy === userId ? false : true,
		}));

		return markedMeetings;
	},
};
