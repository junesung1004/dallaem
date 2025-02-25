import { joinGroup } from '@/api/detail-meeting/joinGroup';
import { leaveGroup } from '@/api/detail-meeting/participantsGroup';
import { cancelGroup } from '@/api/detail-meeting/cancelGroup';
import { useGlobalModal } from '@/hooks/customs/useGlobalModal';
import { useRouter } from 'next/navigation';

export const useGroupActions = (
	groupId: number,
	updateParticipantCount: (delta: number) => void,
) => {
	const { openModal, closeModal } = useGlobalModal();
	const router = useRouter();

	const handleApiError = (error: Error, fallbackMessage: string) => {
		const errorMessage = error.message.replace(/^Error:\s*/, '');
		openModal({
			content: errorMessage || fallbackMessage,
			confirmType: 'Alert',
			buttonPosition: 'right',
			onConfirm: () => {
				closeModal();
				console.error(fallbackMessage, error);
			},
		});
	};

	const join = async () => {
		try {
			await joinGroup(groupId);
			updateParticipantCount(1);
			openModal({
				content: '참여 완료했습니다',
				confirmType: 'Alert',
				buttonPosition: 'right',
				onConfirm: closeModal,
			});
		} catch (error: any) {
			handleApiError(error, '참여 중 오류가 발생했습니다');
		}
	};

	const leave = async () => {
		try {
			await leaveGroup(groupId);
			updateParticipantCount(-1);
			openModal({
				content: '참여가 취소되었습니다',
				confirmType: 'Alert',
				buttonPosition: 'right',
				onConfirm: closeModal,
			});
		} catch (error: any) {
			handleApiError(error, '참여 취소 중 오류가 발생했습니다');
		}
	};

	const cancel = async () => {
		try {
			await cancelGroup(groupId);
			openModal({
				content: '모집 공고가 취소되었습니다',
				confirmType: 'Alert',
				buttonPosition: 'right',
				onConfirm: () => {
					closeModal();
					router.push('/');
				},
			});
		} catch (error: any) {
			handleApiError(error, '모집 취소 중 오류가 발생했습니다');
		}
	};

	return { join, leave, cancel };
};
