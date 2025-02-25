'use client';

import { useMyMeetings } from '@/hooks/customs/useMyMeetings';
import CardList from '../components/CardList/CardList';
import { useAuthStore } from '@/store/useAuthStore';

function Page() {
	const userId = useAuthStore((state) => state.userId) ?? '';
	const { meetings } = useMyMeetings('hosted', {
		userId,
	});

	if (!userId) return null;

	return <CardList data={meetings || []} cardType='hosted' />;
}

export default Page;
