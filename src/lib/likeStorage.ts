import { getGuestId } from './getGuestId';

const STORAGE_KEY = 'likes';

// zustand에서 좋아요 여부 가져오기
export const getLikedStatus = (
	itemId: number,
	userId: number | null,
): boolean => {
	const key = userId !== null ? userId.toString() : getGuestId().toString();
	const likes = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
	return likes[key]?.includes(itemId) ?? false;
};

// 좋아요 저장
export const saveLike = (itemId: number, userId: number | null): void => {
	const key = userId !== null ? userId.toString() : getGuestId().toString();
	const storageData = localStorage.getItem(STORAGE_KEY);

	const likes = storageData ? JSON.parse(storageData) : {};

	if (!likes[key]) {
		likes[key] = [];
	}

	if (!likes[key].includes(itemId)) {
		likes[key].push(itemId);
	}

	localStorage.setItem(STORAGE_KEY, JSON.stringify(likes));
};

// 좋아요 취소
export const removeLike = (itemId: number, userId: number | null): void => {
	const key = userId !== null ? userId.toString() : getGuestId().toString();
	const storageData = localStorage.getItem(STORAGE_KEY);

	const likes = storageData ? JSON.parse(storageData) : {};

	if (!likes[key]) {
		return;
	}

	likes[key] = likes[key].filter((id: number) => id !== itemId);

	if (likes[key].length === 0) {
		delete likes[key];
	}

	localStorage.setItem(STORAGE_KEY, JSON.stringify(likes));
};
