import { getFavoriteMeetingData } from '@/api/meeting/getMeetingDate';
import type { getFavoriteMeetingsType } from '@/types/meetingsType';

export const meetingService = {
	/** 로컬 스토리지에서 찜한 모임 id 를 가져와서 모임 정보를 가져오는 api */
	async getFavoriteMeetings({
		userId,
		isLoggedIn,
		...filters
	}: getFavoriteMeetingsType) {
		// 로컬 스토리지에서 값을 가져오는 함수
		function getLocalStorageItem<T>(key: string, defaultValue: T): T {
			try {
				const storedValue = localStorage.getItem(key);
				if (storedValue) {
					return JSON.parse(storedValue) as T;
				} else {
					return defaultValue;
				}
			} catch (error) {
				console.error(
					`Error parsing JSON from localStorage for key "${key}":`,
					error,
				);
				return defaultValue;
			}
		}

		const likeList = getLocalStorageItem<{
			[key: string]: number[] | string[];
		}>('likes', {});

		const likerKey = Object.keys(likeList)?.find((key) => {
			// 만약 userId 가 없다면, 로그인 안한 상태
			if (!(userId && isLoggedIn)) {
				// 로컬스토리지에서 guestId 꺼내와서 비교
				const guestId = getLocalStorageItem<string>('guestId', '');
				return Number(key) === Number(guestId);
			}
			return Number(key) === Number(userId);
		});

		// console.log('찜한 모임 id: ', likerKey);

		/** 찜한 목록이 없다면 null 반환 */
		if (!likerKey) return null;

		// key가 존재하면 해당 값을 가져옴
		const userLikeList: number[] | string[] = likerKey
			? likeList[likerKey]
			: [];

		// filter params 가공
		const params = {
			type: filters?.type?.trim() ? filters?.type : 'DALLAEMFIT',
			// type: filters?.type ?? 'DALLAEMFIT, OFFICE_STRETCHING, MINDFULNESS, WORKATION',
			id: userLikeList?.join(','),
		};

		return getFavoriteMeetingData(params);
	},
};
