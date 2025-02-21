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
		type: '',
		location: '',
		date: '',
		sortBy: '',
		sortOrder: 'asc',
	},
	setSelectedFilters: (filters) =>
		set((state) => ({
			selectedFilters: { ...state.selectedFilters, ...filters },
		})),
}));
