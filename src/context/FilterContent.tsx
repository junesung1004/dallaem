'use client';
import { FilterContextType } from '@/types/filterType';
import { createContext, useState, ReactNode } from 'react';

const initialFilterContext: FilterContextType = {
	type: 'DALLAEMFIT',
	location: '',
	date: '',
	sortBy: '',
	sortOrder: 'desc',
	setType: () => {},
	setLocation: () => {},
	setDate: () => {},
	setSortBy: () => {},
	setSortOrder: () => {},
};

export const FilterContext =
	createContext<FilterContextType>(initialFilterContext);

const FilterProvider = ({ children }: { children: ReactNode }) => {
	const [type, setType] = useState(initialFilterContext.type);
	const [location, setLocation] = useState(initialFilterContext.location);
	const [date, setDate] = useState(initialFilterContext.date);
	const [sortBy, setSortBy] = useState(initialFilterContext.sortBy);
	const [sortOrder, setSortOrder] = useState(initialFilterContext.sortOrder);

	return (
		<FilterContext.Provider
			value={{
				type,
				location,
				date,
				sortBy,
				sortOrder,
				setType,
				setLocation,
				setDate,
				setSortBy,
				setSortOrder,
			}}
		>
			{children}
		</FilterContext.Provider>
	);
};

export default FilterProvider;
