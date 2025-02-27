export interface LikeButtonProps {
	onLikeChangeHandler?: ((likeState: boolean) => void) | undefined;

	itemId: number;
	userId?: number;
	registrationEnd?: boolean;
}

export interface LikesStorage {
	[userId: number]: number[];
}

export interface ILikeListJSON {
	[key: string]: number[] | string[];
}
