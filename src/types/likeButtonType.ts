export interface LikeButtonProps {
	itemId: number;
	userId?: number;
	registrationEnd?: boolean;
}

export interface LikesStorage {
	[userId: number]: number[];
}
