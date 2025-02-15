export interface CreateMeeting {
	location: string;
	type: string | null;
	name: string;
	dateTime: Date | null;
	capacity: number | null;
	image: string;
	registrationEnd: Date | null;
}
