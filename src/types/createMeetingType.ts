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
