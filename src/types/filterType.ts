export interface FilterContextType {
	type?: string;
	location?: string;
	date?: string;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
	setType?: (type: string) => void;
	setLocation?: (location: string) => void;
	setDate?: (date: string) => void;
	setSortBy?: (sortBy: string) => void;
	setSortOrder?: (sortOrder: 'asc' | 'desc') => void;
}

export type FilterType = Pick<
	FilterContextType,
	'type' | 'location' | 'date' | 'sortBy' | 'sortOrder'
> | null;

export type OnFilterType = <T = void>(
	filter: Pick<
		FilterContextType,
		'type' | 'location' | 'date' | 'sortBy' | 'sortOrder'
	> | null,
) => T;
