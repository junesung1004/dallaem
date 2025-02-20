import { getMeetingData } from '@/api/meeting/getMeetingDate';
import { CreateMeeting } from '@/types/createMeetingType';
import { useEffect, useState } from 'react';

export function useMainCard(initialData: CreateMeeting[], fetchOptions?: null) {
	const [meetings, setMeetings] = useState<CreateMeeting[]>(initialData || []);

	// ✅ 모임 데이터 가져오기
	const getMeetingListDate = async () => {
		try {
			const res = await getMeetingData(fetchOptions || {});
			setMeetings(res);
		} catch (error) {
			console.error('모임 목록 가져오기 실패:', error);
		}
	};

	useEffect(() => {
		if (initialData.length === 0) {
			console.log('initialData :', initialData);
			getMeetingListDate();
		}
	}, []);

	return { meetings };
}
