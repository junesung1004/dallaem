import { reviewService } from '@/service/reviewService';
import { useEffect, useState } from 'react';
import { useFilter } from './useFilter';

export const useFetchReviews = () => {
	const [reviews, setReviews] = useState([]);
	const { type, location, date, sortBy, sortOrder } = useFilter();

	const fetchReviews = async () => {
		const params = new URLSearchParams();
		try {
			if (type) {
				params.append('type', type);
			}
			if (location) {
				params.append('location', location);
			}
			if (date) {
				params.append('date', date);
			}
			if (sortBy) {
				params.append('sortBy', sortBy);
			}
			if (sortOrder) {
				params.append('sortOrder', sortOrder);
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
		fetchReviews();
	}, [type, location, date, sortBy, sortOrder]);

	return reviews;
};
