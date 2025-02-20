export interface PageInfoData {
	title: string;
	description: string;
	src: string;
}

export interface PageNavData {
	id: string;
	label: string;
	icon?: string;
	active: boolean;
	subItems?: PageNavData[];
}

export interface FilteringData {
	label: string;
	value: string;
}
