export interface MeetingCardProps {
	type: string;
	location: string;
	date: string;
	id: number;
}

export interface DetailMeetingDataType {
	teamId: string;
	id: number;
	type: string;
	name: string;
	dateTime: string;
	registrationEnd: string;
	location: string;
	participantCount: number;
	capacity: number;
	image: string;
	createdBy: number;
	canceledAt: string | null;
}
