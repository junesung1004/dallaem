import { getMeetingData } from '@/api/meeting/getMeetingDate';
import { useFilterStore } from '@/store/useInputSelectFilterStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect, useState } from 'react';
import type { MeetingCardListProps } from '@/types/meetingsType';
import type { IMeeting } from '@/types/meetingsType';
import { meetingService } from '@/app/(home)/favorite-meetings/meetingService';
export function useMainCard(
	initialData: IMeeting[],
	meetingType?: Pick<MeetingCardListProps, 'meetingType'>['meetingType'],
) {
	const [meetings, setMeetings] = useState<IMeeting[]>(initialData || []);

	// 🟢 Zustand에서 전역 필터 상태 가져오기
	const { selectedFilters } = useFilterStore();

	// `meetingType`이 'favorite'일 때만 useAuthStore 호출
	const { userId, isLoggedIn } =
		meetingType === 'favorite'
			? useAuthStore()
			: { userId: null, isLoggedIn: null };

	// API 호출 함수
	const getMeetingListDate = async () => {
		try {
			const filters = { ...selectedFilters };

			let res;
			if (meetingType === 'favorite') {
				// 찜한 목록 카드 API 호출을 기다림
				res = await meetingService.getFavoriteMeetings({
					...filters,
					userId,
					isLoggedIn,
				});
			} else {
				// 기본 API 호출
				res = await getMeetingData(filters);
			}

			// API 호출이 성공하면 결과를 설정
			setMeetings(res);
		} catch (error) {
			console.error('모임 목록 가져오기 실패:', error);
		}
	};

	// ✅ 필터 적용된 모임 목록
	// const filteredMeetings = meetings?.filter((meeting) => {
	// 	const locationMatch =
	// 		!selectedFilters.location ||
	// 		meeting.location.includes(selectedFilters.location);

	// 	const dateMatch =
	// 		!selectedFilters.date ||
	// 		(meeting.dateTime &&
	// 			new Date(meeting.dateTime)
	// 				.toISOString()
	// 				.startsWith(selectedFilters.date));

	// 	return locationMatch && dateMatch;
	// });

	useEffect(() => {
		if (initialData?.length === 0) {
			getMeetingListDate();
		}
	}, []);

	return { meetings };
}
