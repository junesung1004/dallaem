import { useQuery } from '@tanstack/react-query';
import { meetingService } from '@/app/(home)/favorite-meetings/meetingService';
import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { IMeeting } from '@/types/meetingsType';

export const useFavoriteMeetings = () => {
	// 로컬 스토리지에서 찜한 아이디 목록 가져오기
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

	const [filteredMeetings, setFilteredMeetings] = useState<IMeeting[]>([]);
	const { userId, isLoggedIn, hasHydrated } = useAuthStore();

	// 데이터 가져오는 함수
	const getData = async () => {
		console.log(
			'로컬에서 가져온 userId값 있음?',
			'ID값: ',
			userId,
			hasHydrated,
		);

		// 로그인한 유저 가져오기 전에는 api 호출하지 않음
		if (!hasHydrated) {
			return [];
		}

		// 아이디 목록을 기준으로 API 호출
		const res = await meetingService.getFavoriteMeetings({
			userId,
			isLoggedIn,
			// 나중에 필터 추가
		});
		return setFilteredMeetings(res);
	};

	// React Query로 서버에서 모임 데이터 가져오기
	const { data, isLoading, error } = useQuery({
		queryKey: userId ? ['favorite', userId] : [], // userId가 있을 때만 쿼리 키 설정
		queryFn: getData,
	});

	const deleteLikeMeetings = () => {
		setFilteredMeetings(() => {
			return filteredMeetings?.filter((item) => {
				[1000].includes(item.id);
			});
		});
	};

	return {
		meetings: filteredMeetings,
		isLoading,
		error,
		deleteLikeMeetings,
	};
};
