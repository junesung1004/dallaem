'use client';
import { FilterContextType } from '@/types/filterType';
import { createContext, useState, ReactNode } from 'react';

export const FilterContext = createContext<FilterContextType | null>(null);

const FilterProvider = ({ children }: { children: ReactNode }) => {
	const [type, setType] = useState('DALLAEMFIT');
	const [location, setLocation] = useState('');
	const [date, setDate] = useState('');
	const [sortBy, setSortBy] = useState('createdAt');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

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
