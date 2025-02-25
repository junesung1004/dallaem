import { reviewService } from '@/service/reviewService';
import { useFilterStore } from '@/store/useInputSelectFilterStore';
import { useEffect, useState } from 'react';

export const useFetchReviews = () => {
	const [reviews, setReviews] = useState([]);
	const { selectedFilters } = useFilterStore();

	const fetchReviews = async () => {
		const params = new URLSearchParams();
		try {
			if (selectedFilters.type) {
				params.append('type', selectedFilters.type);
			}
			if (selectedFilters.location) {
				params.append('location', selectedFilters.location);
			}
			if (selectedFilters.date) {
				params.append('date', selectedFilters.date);
			}
			if (selectedFilters.sortBy) {
				params.append('sortBy', selectedFilters.sortBy);
			}
			if (selectedFilters.sortOrder) {
				params.append('sortOrder', selectedFilters.sortOrder);
			}

			const data = await reviewService.getDetailReviewData({
				limit: 20, //임시값
				...Object.fromEntries(params), //UrlSearchParams를 object로 변환
			});

			setReviews(data.data);
		} catch (error) {
			console.error('review data fetch error:', error);
		}
	};

	useEffect(() => {
		if (selectedFilters) {
			fetchReviews();
		}
	}, [selectedFilters]);

	return reviews;
};
