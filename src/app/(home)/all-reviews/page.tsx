import FilterList from '@/components/Filtering/FIlterList';

const initialFilters = {
	location: '',
	date: '',
	sortMeeting: {
		sortBy: 'dateTime',
		sortOrder: 'asc' as 'asc' | 'desc',
	},
};

export default function AllReviews() {
	return (
		<div>
			<FilterList
				enabledFilters={['location', 'date', 'sortByMeeting']}
				initialFilters={initialFilters}
			/>
		</div>
	);
}
