import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { IReviewState } from '../customs/useCreateReview';
import { createReview } from '@/api/reivews';
import { useGlobalModal } from '../customs/useGlobalModal';

export const useReviewMutation = (
	userId: number | null,
	meetingId: string,
	payload: Omit<IReviewState, 'valid'>,
) => {
	const { closeAllModal } = useGlobalModal();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: () => createReview(meetingId, payload),
		onSuccess: (res) => {
			if (res) {
				closeAllModal();
				queryClient.invalidateQueries({
					predicate: (query) => {
						return query.queryKey.includes('review');
					},
				});
				queryClient.invalidateQueries({
					predicate: (query) => {
						return query.queryKey.includes('joined');
					},
				});
			}
		},
		// throwOnError: true,
	});

	return { mutation };
};
