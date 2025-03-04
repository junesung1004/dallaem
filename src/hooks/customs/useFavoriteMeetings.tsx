import { useQuery } from '@tanstack/react-query';
import { meetingService } from '@/app/(home)/favorite-meetings/meetingService';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import type { IMeeting } from '@/types/meetingsType';
import { useFilter } from './useFilter';

import {
	deleteLikeId,
	getLikerKey,
	getLocalStorageItem,
} from '@/utils/localStorage';
import type { ILikeListJSON } from '@/types/likeButtonType';

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

		// 아이디 목록을 기준으로 API 호출
		const res = await meetingService.getFavoriteMeetings({
			userId,
			isLoggedIn,
		});
		return res; // 반드시 데이터를 반환
	};

	const { userId, isLoggedIn } = useAuthStore();

	// 데이터를 state로 저장
	const [filteredMeetings, setFilteredMeetings] = useState<IMeeting[]>([]);

	// likeList는 최신 상태 유지
	const likeList = getLocalStorageItem<ILikeListJSON>('likes', {});

	/** 비회원인 경우 hasHydrated false / isLoggedIn false */
	const likerKey =
		userId || !isLoggedIn
			? getLikerKey({ likeList, user: userId, isLoggedIn })
			: null;

	const { data, isLoading, error } = useQuery({
		queryKey: likerKey
			? ['favorite', likerKey, likeList[likerKey]?.join('')]
			: [],
		queryFn: getData,
	});

	// data가 업데이트되면 상태를 변경
	useEffect(() => {
		if (data) {
			// filter type 이 변경되면 클라이언트 필터링
			const filteredData = data?.filter((item: IMeeting) => {
				if (type === 'DALLAEMFIT') {
					return item.type !== 'WORKATION';
				}

				return item.type === type;
			});

			const latestLikeList = getLocalStorageItem<
				Record<string, number[] | string[]>
			>('likes', {});

			if (!likerKey) {
				return setFilteredMeetings(filteredData);
			}

			// console.log('처음 받아온 data', data);

			// A. 모집이 마감된 id 가 있는 경우 찜 삭제
			const canceledMeetings = latestLikeList[likerKey]?.filter(
				(id: string | number) => {
					return !data.map((meeting: IMeeting) => meeting.id).includes(id);
				},
			);
			// console.log(canceledMeetings);

			// 찜 삭제
			deleteLikeId(canceledMeetings as number[], userId);

			// 필터링된 모임 렌더링
			setFilteredMeetings(filteredData);
		}
	}, [data, type]);

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
