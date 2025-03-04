'use client';

import { createMeeting, joinMeeting } from '@/api/meeting/createMeeting';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


export const useCreateMeeting = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	const mutation = useMutation({
		mutationFn: createMeeting,
		onSuccess: async (res) => {
			console.log('모임 생성 성공 : ', res);

			const meetingId = res.id;
			console.log('meetingId : ', meetingId);
			try {
				await joinMeeting(meetingId);
				console.log('모임 자동 참여 성공');
			} catch (error) {
				console.error('모임 자동 참여 실패:', error);
			}

			queryClient.invalidateQueries({ queryKey: ['home-meetings-cardlist'] });

			toast.success('모임이 성공적으로 생성되었습니다!', {
				autoClose: 3000,
				position: 'top-center',
			});

			router.back();
		},
		onError: (error) => {
			console.error('모임 생성 실패 : ', error);
		},
	});

	return mutation;
};
