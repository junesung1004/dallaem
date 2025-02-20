'use client';

import { useMyMeetings } from '@/hooks/customs/useMyMeetings';
import CardList from '../../components/CardList/CardList';

function Page() {
	const { meetings } = useMyMeetings('joined', {
		completed: true,
	});
	return <CardList data={meetings || []} cardType='joined' />;
}

export default Page;
