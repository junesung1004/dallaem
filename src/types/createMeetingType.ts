export interface CreateMeeting {
	id?: number;
	location: string;
	type: string | null;
	name: string;
	dateTime: Date | null;
	capacity: number | null;
	image: string | null;
	registrationEnd: Date | null;
}

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
