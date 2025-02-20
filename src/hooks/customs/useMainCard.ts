import { getMeetingData } from '@/api/meeting/getMeetingDate';
import { useFilterStore } from '@/store/useInputSelectFilterStore';
import { useEffect, useState } from 'react';
import type { getMeetingParamsType } from '@/types/meetingsType';
import type { IMeeting } from '@/types/meetingsType';

export function useMainCard(
	initialData: IMeeting[],
	// meetingType?: Pick<MeetingCardListProps, 'meetingType'>,
	meetingType?: 'favorite',
) {
	const [meetings, setMeetings] = useState<IMeeting[]>(initialData || []);

	// 🟢 Zustand에서 전역 필터 상태 가져오기
	const { selectedFilters } = useFilterStore();

	type ApiFunction = (filter: getMeetingParamsType) => Promise<IMeeting[]>;

	const getMeetingListDate = async (api: ApiFunction) => {
		try {
			const res = await api(selectedFilters || {});
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
			// meetingType 이 favorite인지 아닌지 확인
			if (meetingType && meetingType === 'favorite') {
				// getMeetingListDate(newApi);
			}

			getMeetingListDate(getMeetingData);
		}
	}, []);

	return { meetings };
}
