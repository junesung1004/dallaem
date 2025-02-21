'use client';

import { useMyMeetings } from '@/hooks/customs/useMyMeetings';
import CardList from '../components/CardList/CardList';
import { useStore } from '@/store/useAuthStore';

function Page() {
	const userId = useStore((state) => state.userId);

	if (!userId) return null;

	const { meetings } = useMyMeetings('hosted', {
		userId,
	});
	return <CardList data={meetings || []} cardType='hosted' />;
}

export default Page;
