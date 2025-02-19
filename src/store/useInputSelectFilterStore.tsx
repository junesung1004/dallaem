import { create } from 'zustand';

interface FilterState {
	selectedFilters: {
		location: string;
		date: string;
		sortReview: {
			sortBy: string;
			sortOrder: 'asc' | 'desc';
		};
	};
	setSelectedFilters: (
		filters: Partial<FilterState['selectedFilters']>,
	) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
	selectedFilters: {
		location: '',
		date: '',
		sortReview: {
			sortBy: 'createdAt',
			sortOrder: 'asc',
		},
	},
	setSelectedFilters: (filters) =>
		set((state) => ({
			selectedFilters: { ...state.selectedFilters, ...filters },
		})),
}));
