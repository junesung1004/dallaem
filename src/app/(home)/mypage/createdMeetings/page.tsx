'use client';

import { useMyMeetings } from '@/hooks/customs/useMyMeetings';
import CardList from '../components/CardList/CardList';
import { getUserData } from '@/api/getUserData';

function Page() {
	/** 사용자 정보 가져오기 authorization 변경되면 개선할 부분 */
	const userData = getUserData();
	const { meetings } = useMyMeetings('hosted', {
		/** hard coding */
		userId: userData?.id ?? '1368',
	});
	return <CardList data={meetings || []} cardType='hosted' />;
}

export default Page;
