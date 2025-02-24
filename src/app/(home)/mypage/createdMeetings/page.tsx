'use client';

import { useMyMeetings } from '@/hooks/customs/useMyMeetings';
import CardList from '../components/CardList/CardList';
import { useAuthStore } from '@/store/useAuthStore';

function Page() {
	const userId = useAuthStore((state) => state.userId);

	if (!userId) return null;

	const { meetings } = useMyMeetings('hosted', {
		userId,
	});
	return <CardList data={meetings || []} cardType='hosted' />;
}

export default Page;
