import { getReviewScore } from '@/api/getReveiwScore';
import { ReviewScore } from '@/types/reviewType';
import { useQuery } from '@tanstack/react-query';
import { useFilter } from '../customs/useFilter';
import { FilterContextType } from '@/types/filterType';

function useFetchReviewScores({ gatheringId }: { gatheringId: string }) {
	const { type } = useFilter() as FilterContextType;
	const { data, isLoading, error } = useQuery<ReviewScore, Error>({
		queryKey: ['reviewScores', type, gatheringId],
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
