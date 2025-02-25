'use client';

import { useMyMeetings } from '@/hooks/customs/useMyMeetings';
import CardList from './components/CardList/CardList';
import { myMeetingService } from './components/CardList/Services/myMeetingService';
import { IMeeting } from '@/types/meetingsType';
import { useGlobalModal } from '@/hooks/customs/useGlobalModal';
import { leaveGroup } from '@/api/detail-meeting/participantsGroup';

function MyPage() {
	const { meetings, setMeetings } = useMyMeetings('joined');
	const { openModal, closeModal } = useGlobalModal();

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
						setMeetings(data);
						return closeModal();
					}
				}
			},
			onDismiss: closeModal,
		});
	}
	return (
		<CardList
			data={meetings || []}
			cardType='joined'
			onCancelClick={(e, id) => onCancelClick(e, id)} // 전달 시, e와 id를 넘겨줌
		/>
	);
}

export default MyPage;
