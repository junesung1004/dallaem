import { FilterContext } from '@/context/FilterContent';
import { useContext } from 'react';

export const useFilter = () => {
	const context = useContext(FilterContext);

	return context;
};
