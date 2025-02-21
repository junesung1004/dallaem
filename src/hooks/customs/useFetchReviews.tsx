import { reviewService } from '@/service/reviewService';
import { useEffect, useState } from 'react';

export const useFetchReviews = () => {
	const [reviews, setReviews] = useState([]);
	//전역으로 상태 값 가져와서 파라미터로 넘겨주기
	async function fetchReviews() {
		const data = await reviewService.getDetailReviewData({
			type: '',
			location: '',
		});
		setReviews(data.data);
	}

	useEffect(() => {
		fetchReviews();
	}, []);

	return reviews;
};
