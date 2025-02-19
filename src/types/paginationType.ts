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

export interface PaginationReviewProps {
	currentData: ReviewType[];
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}
