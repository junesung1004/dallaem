'use client';

import { createMeeting } from '@/api/meeting/createMeeting';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useCreateMeeting = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	const mutation = useMutation({
		mutationFn: createMeeting,
		onSuccess: (res) => {
			console.log('모임 생성 성공 : ', res);
			queryClient.invalidateQueries({ queryKey: ['home-meetings-cardlist'] });
			router.back();
		},
		onError: (error) => {
			console.error('모임 생성 실패 : ', error);
		},
	});

	return mutation;
};
