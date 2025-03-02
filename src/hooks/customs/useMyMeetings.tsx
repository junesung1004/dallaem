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
	const { userId } = useAuthStore();

	const fetchMeetings = async (pageKey: string = 'joined') => {
		/** 이용 완료 여부/리뷰 작성 여부 options */
		const options: { completed?: boolean; reviewed?: boolean } = {};
		options.completed = pageKey === 'review' ? true : false;

		try {
			let data;

			switch (pageKey) {
				case 'joined':
				case 'review': {
					data = await myMeetingService.fetchMyMeetings<IMeeting[]>({
						completed: options?.completed || false,
						reviewed: options?.reviewed || false,
					});

					break;
				}
				case 'hosted': {
					data = await myMeetingService.fetchMyHostedMeetings<IMeeting[]>(
						String(userId),
					);
					break;
				}
				default:
					console.error('Invalid pageKey');
					return null;
			}

			return data;
		} catch (err) {
			if (!(err instanceof Error)) {
				console.error('Unknown error');
				return null;
			}

			// 에러 메시지에 따라 처리
			if (err.message === 'token invalid') {
				openModal({
					content: (
						<span>
							로그인이 만료되었습니다.
							<br />
							로그인 페이지로 이동합니다
						</span>
					),
					confirmType: 'Alert',
					onConfirm: () => {
						closeModal();
						router.push('/login');
					},
				});
			} else {
				console.error(err);
				openModal({
					content: '문제가 발생하였습니다. 다시 시도해주세요',
					confirmType: 'Alert',
					onConfirm: () => {
						closeModal();
					},
				});
			}

			return null;
		}
	};

	const { data, refetch } = useSuspenseQuery({
		queryKey: [userId, pageKey],
		queryFn: () => (userId ? fetchMeetings(pageKey) : null),
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
