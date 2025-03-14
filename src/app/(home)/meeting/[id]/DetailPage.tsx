import DetailClient from './DetailClient';
import { DetailMeetingDataType } from '@/types/meetingDetail';

export default function DetailPage({
	detailData,
}: {
	detailData: DetailMeetingDataType;
}) {
	return <DetailClient detailData={detailData} />;
}
