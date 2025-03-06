import { useState } from 'react';
import type { FilterContextType } from '@/types/filterType';
export const useFilters = (
	initialFilter: Pick<
		FilterContextType,
		'type' | 'location' | 'date' | 'sortBy' | 'sortOrder'
	> | null,
) => {
	// 필터는 상태 값으로 관리한다
	const [type, setType] = useState(initialFilter?.type ?? '');
	const [location, setLocation] = useState(initialFilter?.location ?? '');
	const [date, setDate] = useState(initialFilter?.date ?? '');
	const [sortBy, setSortBy] = useState(initialFilter?.sortBy ?? '');
	const [sortOrder, setSortOrder] = useState(
		initialFilter?.sortOrder ?? ('desc' as const),
	);

	// setter 를 모아서 setter가 있고 이건 change handler/click handler 등으로 사용되도록,
	// chage 될 때마다 UI 에서 사용되는 콜백함수
	// UI 들한테 전달 --> type, location 등등의 상태 값 변화 trigger
	// 나 type 인데 내가 변경됐어, sortBy 내가 변경됐어, 이렇게 구분해서 받아올 수 있음
	// 구분한 값으로 state update
	const handleChangeFilter = (name: string, value: string) => {
		switch (name) {
			case 'type':
				setType(value);
				break;
			case 'location':
				setLocation(value);
				break;
			case 'date':
				setDate(value);
				break;
			case 'sortBy':
				setSortBy(value);
				break;
			case 'sortOrder':
				setSortOrder(value);
				break;
			default:
				console.warn(`Unknown filter name: ${name}`);
		}
	};

	const handleTypeHandler = (id?: string) => {
		console.log('변경 전', type, '변경 후', id);
		handleChangeFilter('type', id ?? '');
	};

	// type 등등의 상태 값을 '감지'하는 useEffect
	// 사실 얘는 구분을 몰라도 됨
	// useEffect 안에서 callback으로 받아온 데이터 함수 실행
	// callback 은 상태값을 기반으로 이거 데이터 요청해

	// pathname 구분해서 or pageKey 값을 받아서 sortBy 처리

	// (params : sttae) -> await getMeetings(params);
	const filterSetter = {
		setType,
		setLocation,
		setDate,
		setSortBy,
		setSortOrder,
	};

	const currentFilter = {
		type,
		location,
		date,
		sortBy,
		sortOrder,
	};

	return { handleChangeFilter, handleTypeHandler, currentFilter };
};
