import { useQuery } from '@tanstack/react-query';
import { reviewService } from '@/service/reviewService';
import { useFilter } from '../customs/useFilter';

export const useFetchReviewsData = () => {
	const { type, location, date, sortBy, sortOrder } = useFilter();

	return useQuery({
		queryKey: ['reviews', type, location, date, sortBy, sortOrder],
		queryFn: async () => {
			const params = new URLSearchParams();

			if (type) params.append('type', type);
			if (location) params.append('location', location);
			if (date) params.append('date', date);
			if (sortBy) params.append('sortBy', sortBy);
			if (sortOrder) params.append('sortOrder', sortOrder);

			const res = await reviewService.getDetailReviewData({
				limit: 20, // 임시값
				...Object.fromEntries(params),
			});
			return res.data;
		},
		enabled: true,
		staleTime: 1000 * 60 * 1,
	});
};
