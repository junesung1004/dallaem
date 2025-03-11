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
