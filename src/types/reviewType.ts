export interface ReviewScore {
	teamId: number;
	gatheringId: number;
	type: string;
	averageScore: number;
	oneStar: number;
	twoStars: number;
	threeStars: number;
	fourStars: number;
	fiveStars: number;
}

export interface GetReviewsParams {
	gatheringId?: string;
	type?: '' | 'DALLAEMFIT' | 'OFFICE_STRETCHING' | 'MINDFULNESS' | 'WORKATION';
}

export interface ReviewQueryType {
	gatheringId?: string;
	limit?: number;
	currentPage?: number;
	userId?: number;
	type?: '' | 'DALLAEMFIT' | 'OFFICE_STRETCHING' | 'MINDFULNESS' | 'WORKATION';
	location?: '건대입구' | '을지로 3가' | '신림' | '홍대입구' | '';
	registrationEnd?: string;
	date?: string;
	sortOrder?: string;
	sortBy?: string;
}
