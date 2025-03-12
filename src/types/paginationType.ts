export interface GatheringType {
	teamId: string;
	id: number;
	type: string;
	name: string;
	dateTime: string;
	location: string;
	image: string;
}

export interface UserType {
	teamId: string;
	id: number;
	name: string;
	image: string | null;
}

export interface ReviewType {
	teamId: string;
	id: number;
	score: number;
	comment: string;
	createdAt: string;
	Gathering: GatheringType;
	User: UserType;
}

export interface PaginationReviewProps {
	data: ReviewType[];
	totalItemCount: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export interface ReviewInitialData {
	data: ReviewType[];
	totalItemCount: number;
	totalPages: number;
}
