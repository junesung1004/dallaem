import { useEffect, useState } from 'react';
import type { IMeeting } from '@/types/createMeetingType';
import { meetingService } from '@/app/(home)/mypage/components/CardList/Services/meetingService';

export const useMyMeetings = (
	pageKey: 'joined' | 'review' | 'hosted',
	options?: {
		userId?: number | string;
		completed?: boolean;
		reviewed?: boolean;
	},
) => {
	const [meetings, setMeetings] = useState<IMeeting[]>();

	const fetchMeetings = async (
		pageKey: string,
		options: { completed?: boolean; reviewed?: boolean; userId?: string },
	) => {
		switch (pageKey) {
			case 'joined':
			case 'review': {
				const data = await meetingService.fetchMyMeetings<IMeeting[]>({
					completed: options?.completed || false,
					reviewed: options?.reviewed || false,
				});
				setMeetings(data);
				break;
			}
			case 'hosted': {
				const hostedData = await meetingService.fetchMyHostedMeetings<
					IMeeting[]
				>(options?.userId);
				setMeetings(hostedData);
				break;
			}
			default:
				console.error('Invalid pageKey');
		}
	};

	/** 나중에 react query 로 대체될 부분 */
	useEffect(() => {
		fetchMeetings(pageKey, options || {});
	}, []);

	return { meetings };
};
