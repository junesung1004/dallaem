import { useQuery } from '@tanstack/react-query';
import { meetingService } from '@/app/(home)/favorite-meetings/meetingService';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { IMeeting } from '@/types/meetingsType';
import { useFilter } from './useFilter';
import { useLikeNotify } from './useLikeNotify';

// 로컬 스토리지에서 값을 가져오는 함수
/** utils로 변경 예정 */
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

/** 로그인한 사용자 또는 guest ID를 반환하는 함수 */
/** utils로 변경 예정 */
function getLikerKey({
	likeList,
	user,
	isLoggedIn,
}: {
	likeList: ILikeListJSON;
	user: number | null;
	isLoggedIn: boolean;
}) {
	return Object.keys(likeList).find((key) => {
		if (!(user && isLoggedIn)) {
			// 로그인되지 않은 경우 guestId를 사용
			const guestId = getLocalStorageItem<string>('guestId', '');
			return Number(key) === Number(guestId);
		}
		return Number(key) === Number(user);
	});
}

interface ILikeListJSON {
	[key: string]: number[] | string[];
}

export const useFavoriteMeetings = () => {
	const { type } = useFilter();
	// 데이터 가져오는 함수
	const getData = async () => {
		// console.log(
		// 	'로컬에서 가져온 userId값 있음?',
		// 	'ID값: ',
		// 	userId,
		// 	hasHydrated,
		// );

		// 로그인한 유저 가져오기 전에는 api 호출하지 않음
		if (!hasHydrated) {
			return [];
		}

		// 아이디 목록을 기준으로 API 호출
		const res = await meetingService.getFavoriteMeetings({
			userId,
			isLoggedIn,
			type,
		});
		return res; // 반드시 데이터를 반환
	};
	const { likeNotification } = useLikeNotify();
	const { userId, isLoggedIn, hasHydrated } = useAuthStore();
	const [localKeys, setLocalKeys] = useState('');

	// 데이터를 state로 저장
	const [filteredMeetings, setFilteredMeetings] = useState<IMeeting[]>([]);

	// likeList는 최신 상태 유지
	const likeList = getLocalStorageItem<ILikeListJSON>('likes', {});

	const likerKey = hasHydrated
		? getLikerKey({ likeList, user: userId, isLoggedIn })
		: null;

	const { data, isLoading, error } = useQuery({
		queryKey: likerKey ? ['favorite', likerKey, localKeys, type] : [],
		queryFn: getData,
	});

	// data가 업데이트되면 상태를 변경
	useEffect(() => {
		if (data) {
			setFilteredMeetings(data);
		}
	}, [data]);

	/** 찜 상태 변경될 때마다 */
	useEffect(() => {
		const latestLikeList = getLocalStorageItem<
			Record<string, number[] | string[]>
		>('likes', {});
		if (!likerKey) {
			return;
		}

		// 로컬 key 업데이트(리액트 쿼리 키 변동)
		setLocalKeys(latestLikeList[likerKey]?.join(''));
	}, [likeNotification]);

	/** 찜 상태가 변경될 때 찜한 모임에서 실행되는 함수 */
	const deleteLikeMeetings = (isLike: boolean) => {
		if (!isLike) {
			const latestLikeList = getLocalStorageItem<
				Record<string, number[] | string[]>
			>('likes', {});

			if (!likerKey) {
				return;
			}

			setFilteredMeetings(() => {
				const filterList = filteredMeetings?.filter((item) => {
					return (latestLikeList[likerKey] as number[])?.includes(item.id);
				});

				return filterList;
			});
		}
	};

	return {
		meetings: filteredMeetings,
		isLoading,
		error,
		deleteLikeMeetings,
	};
};
