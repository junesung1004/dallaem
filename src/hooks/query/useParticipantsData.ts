import { participantsGroup } from '@/api/detail-meeting/participantsGroup';
import { useQuery } from '@tanstack/react-query';

export default function useParticipantsData(id: number | null) {
	return useQuery({
		queryKey: ['participantsGroup', id],
		queryFn: () => {
			if (!id) {
				return Promise.resolve([]);
			}
			return participantsGroup(id);
		},
		enabled: Boolean(id),
	});
}
