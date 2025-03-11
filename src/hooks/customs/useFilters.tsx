import { useEffect, useState } from 'react';
import type { FilterType, OnFilterType } from '@/types/filterType';
export const useFilters = (
	initialFilter: FilterType,
	onFilter?: OnFilterType,
) => {
	const [type, setType] = useState(initialFilter?.type ?? '');
	const [location, setLocation] = useState(initialFilter?.location ?? '');
	const [date, setDate] = useState(initialFilter?.date ?? '');
	const [sortBy, setSortBy] = useState(initialFilter?.sortBy ?? '');
	const [sortOrder, setSortOrder] = useState(
		initialFilter?.sortOrder ?? ('desc' as const),
	);

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
				setSortOrder(value as 'asc' | 'desc');
				break;
			default:
				console.warn(`Unknown filter name: ${name}`);
		}
	};

	const handleTypeHandler = (id?: string) => {
		handleChangeFilter('type', id ?? '');
	};

	useEffect(() => {
		if (typeof onFilter === 'function') {
			onFilter({
				type,
				location,
				date,
				sortBy,
				sortOrder,
			});
		}
	}, [type, location, date, sortBy, sortOrder]);

	const currentFilter = {
		type,
		location,
		date,
		sortBy,
		sortOrder,
	};

	return { handleChangeFilter, handleTypeHandler, currentFilter };
};
