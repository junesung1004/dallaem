export interface DummyDataType {
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

export interface PaginationProps {
	data: DummyDataType[];
}
