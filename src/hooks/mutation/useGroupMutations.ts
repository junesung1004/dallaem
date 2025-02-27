'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { joinGroup } from '@/api/detail-meeting/joinGroup';
import { leaveGroup } from '@/api/detail-meeting/participantsGroup';
import { cancelGroup } from '@/api/detail-meeting/cancelGroup';

interface UseGroupMutationsOptions {
	groupId: number;
	onSuccessJoin?: (data?: any) => void;
	onSuccessLeave?: (data?: any) => void;
	onSuccessCancel?: (data?: any) => void;
	onError?: (error: unknown) => void;
}

export function useGroupMutations({
	groupId,
	onSuccessJoin,
	onSuccessLeave,
	onSuccessCancel,
	onError,
}: UseGroupMutationsOptions) {
	const queryClient = useQueryClient();

	const joinMutation = useMutation({
		mutationFn: () => joinGroup(groupId),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['participants', groupId] });
			onSuccessJoin?.(data);
		},
		onError: (error) => {
			onError?.(error);
		},
	});

	const leaveMutation = useMutation({
		mutationFn: () => leaveGroup(groupId),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['participants', groupId] });
			onSuccessLeave?.(data);
		},
		onError: (error) => {
			onError?.(error);
		},
	});

	const cancelMutation = useMutation({
		mutationFn: () => cancelGroup(groupId),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['participants', groupId] });
			onSuccessCancel?.(data);
		},
		onError: (error) => {
			onError?.(error);
		},
	});

	return {
		joinMutation,
		leaveMutation,
		cancelMutation,
	};
}
