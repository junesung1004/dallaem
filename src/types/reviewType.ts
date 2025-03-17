export interface ReviewScore {
	gatheringId?: number;
	teamId?: string;
	type?: string;
	averageScore?: number;
	oneStar: number;
	twoStars: number;
	threeStars: number;
	fourStars: number;
	fiveStars: number;
}

export interface GetReviewsParams {
	gatheringId?: string;
	type?: string;
}

export interface ReviewQueryType {
	gatheringId?: string;
	limit?: number;
	currentPage?: number;
	userId?: number;
	type?: string;
	location?: '건대입구' | '을지로 3가' | '신림' | '홍대입구' | '';
	registrationEnd?: string;
	date?: string;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
}

export interface IReview {
	data: Datum[];
	totalItemCount: number;
	currentPage: number;
	totalPages: number;
}

export interface Datum {
	teamId: number;
	id: number;
	score: number;
	comment: string;
	createdAt: string;
	Gathering: Gathering;
	User: User;
}

// Review interface
export interface IReviewData extends Omit<Datum, 'teamId'> {
	id: number;
	score: number;
	comment: string;
	createdAt: string;
	Gathering: Gathering;
	User: User;
}

interface User {
	teamId: number;
	id: number;
	name: string;
	image: string;
}

interface Gathering {
	teamId: number;
	id: number;
	type: string;
	name: string;
	dateTime: string;
	location: string;
	image: string;
}
