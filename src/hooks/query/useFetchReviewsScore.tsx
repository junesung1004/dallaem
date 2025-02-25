import { getReviewScore } from '@/api/getReveiwScore';
import { useFilterStore } from '@/store/useInputSelectFilterStore';
import { GetReviewsParams, ReviewScore } from '@/types/reviewType';
import { useQuery } from '@tanstack/react-query';

function useFetchReviewScores({ gatheringId }: GetReviewsParams) {
	const type = useFilterStore((state) => state.selectedFilters.type) as
		| 'DALLAEMFIT'
		| 'OFFICE_STRETCHING'
		| 'MINDFULNESS'
		| 'WORKATION';

	const { data, isLoading, error } = useQuery<ReviewScore, Error>({
		queryKey: ['reviewScores', type],
		queryFn: () => getReviewScore({ gatheringId, type }),
		enabled: !!type,
	});

	if (error) {
		console.log(error);
	}

	if (!isLoading) {
		return data;
	}
}

export default useFetchReviewScores;
