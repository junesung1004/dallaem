
export default function AllReviews() {
	return (
		<div>
			<FilterList
				enabledFilters={['location', 'date', 'sortByMeeting']}
				initialFilters={initialFilters}
				enabledFilters={['location', 'date', 'sortByReview']} // 사용 가능한 필터 선택
				selectedFilters={selectedFilters}
				onFilterChange={(filters) =>
					setSelectedFilters({
						location: filters.location || '',
						date: filters.date || '',
						sortReview: filters.sortReview || {
							sortBy: 'createdAt',
							sortOrder: 'asc',
						},
					})
				}
			/>
		</div>
	);
}
