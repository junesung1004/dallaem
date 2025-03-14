import { useEffect, useState } from 'react';
import type { IMeeting } from '@/types/createMeetingType';
import { myMeetingService } from '@/app/(home)/mypage/components/CardList/Services/myMeetingService';

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
		options: {
			completed?: boolean;
			reviewed?: boolean;
			userId?: number | string;
		},
	) => {
		switch (pageKey) {
			case 'joined':
			case 'review': {
				const data = await myMeetingService.fetchMyMeetings<IMeeting[]>({
					completed: options?.completed || false,
					reviewed: options?.reviewed || false,
				});
				setMeetings(data);
				break;
			}
			case 'hosted': {
				const hostedData = await myMeetingService.fetchMyHostedMeetings<
					IMeeting[]
				>(options?.userId as string);
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

	return { meetings, setMeetings };
};
