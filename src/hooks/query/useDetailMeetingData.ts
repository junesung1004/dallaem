import { useQuery } from '@tanstack/react-query';
import { getDetailMeetingData } from '@/api/detail-meeting/getDetailMeetingDate';
import { DetailMeetingDataType } from '@/types/meetingDetail';

export default function useDetailMeetingData(id: string) {
	return useQuery<DetailMeetingDataType | null>({
		queryKey: ['detailMeeting', id],
		queryFn: () => getDetailMeetingData(id),
		enabled: Boolean(id),
	});
}
