import { create } from 'zustand';

interface FilterState {
	selectedFilters: {
		type: string;
		location: string;
		date: string;
		sortBy: string;
		sortOrder: string;
	};
	setSelectedFilters: (
		filters: Partial<FilterState['selectedFilters']>,
	) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
	selectedFilters: {
		type: 'DALLAEMFIT',
		location: '',
		date: '',
		sortBy: '',
		sortOrder: 'desc',
	},
	setSelectedFilters: (filters) =>
		set((state) => ({
			selectedFilters: { ...state.selectedFilters, ...filters },
		})),
}));
