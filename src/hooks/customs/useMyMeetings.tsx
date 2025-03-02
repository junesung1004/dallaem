import type { IMeeting } from '@/types/createMeetingType';
import { myMeetingService } from '@/app/(home)/mypage/components/CardList/Services/myMeetingService';
import { useGlobalModal } from './useGlobalModal';
import { useSuspenseQuery } from '@tanstack/react-query';
import { leaveGroup } from '@/api/detail-meeting/participantsGroup';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

export const useMyMeetings = (pageKey: 'joined' | 'review' | 'hosted') => {
	const router = useRouter();
	const { openModal, closeModal } = useGlobalModal();
	const { hasHydrated, userId } = useAuthStore();

	const fetchMeetings = async (pageKey: string) => {
		if (!hasHydrated || !userId) return [];

		/** 이용 완료 여부/리뷰 작성 여부 options */
		const options: { completed?: boolean; reviewed?: boolean } = {};
		options.completed = pageKey === 'review' ? true : false;

		switch (pageKey) {
			case 'joined':
			case 'review': {
				try {
					const data = await myMeetingService.fetchMyMeetings<IMeeting[]>({
						completed: options?.completed || false,
						reviewed: options?.reviewed || false,
					});
					return data;
				} catch (err) {
					console.error(err);

					if (err === 'token invalid') {
						openModal({
							content: '로그인이 만료되었습니다. 로그인 페이지로 이동합니다',
							confirmType: 'Alert',
							onConfirm: () => {
								router.push('/login');
							},
						});
					}

					return [];
				}
				break;
			}
			case 'hosted': {
				const hostedData = await myMeetingService.fetchMyHostedMeetings<
					IMeeting[]
				>(String(userId));
				return hostedData;
				break;
			}
			default:
				console.error('Invalid pageKey');
		}
	};

	const { data, refetch } = useSuspenseQuery({
		queryKey: userId ? [userId, pageKey] : [],
		queryFn: () => fetchMeetings(pageKey),
	});

	/** 예약 취소 submit */
	function onCancelClick(e: React.MouseEvent, id: number) {
		e.preventDefault();
		e.stopPropagation();

		openModal({
			content: '예약을 취소하시겠습니까?',
			confirmType: 'Confirm',
			onConfirm: async () => {
				const res = await leaveGroup(id);

				if (res) {
					const data = await myMeetingService.fetchMyMeetings<IMeeting[]>({
						completed: false,
						reviewed: false,
					});

					if (data) {
						await refetch();
						return closeModal();
					}
				}
			},
			onDismiss: closeModal,
		});
	}

	// return { meetings: data, setMeetings, isLoading, error, onCancelClick };
	return { meetings: data, onCancelClick };
};
