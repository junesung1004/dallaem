export interface IMeeting {
	teamId: number;
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
	canceledAt: string;
}
export interface getMeetingParamsType {
	type?: string;
	location?: string;
	sortBy?: string;
	sortOrder?: string;
	limit?: number;
	offset?: number;
}

export interface getFavoriteMeetingsType extends getMeetingParamsType {
	userId: number | null;
	isLoggedIn: boolean | null;
}

export interface MeetingCardListProps {
	initialData?: IMeeting[];
	meetingType?: 'favorite' | undefined; // 찜한 목록
}
