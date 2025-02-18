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

export interface ReviewType {
	teamId: string;
	id: number;
	score: number;
	comment: string;
	createdAt: string;
	Gathering: {
		teamId: string;
		id: number;
		type: string;
		name: string;
		dateTime: string;
		location: string;
		image: string;
	};
	User: {
		teamId: string;
		id: number;
		name: string;
		image: string | null;
	};
}

export interface DummyReviewDataType {
	data: ReviewType[];
	totalItemCount: number;
	currentPage: number;
	totalPages: number;
}

export interface PaginationReviewProps {
	currentData: ReviewType[];
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}
