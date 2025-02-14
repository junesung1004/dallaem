export interface LikeButtonProps {
	itemId: number;
	userId?: number;
}

export interface LikesStorage {
	[userId: number]: number[];
}
