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
