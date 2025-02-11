'use client';

import { LikeButton } from '@/app/components/LikeButton';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { DateBadge } from '@/app/components/DateBadge';

const mockData = [
	{ id: 1, name: '게시물 1' },
	{ id: 2, name: '게시물 2' },
	{ id: 3, name: '게시물 3' },
	{ id: 4, name: '게시물 4' },
	{ id: 5, name: '게시물 5' },
];

export default function DetailPage() {
	const { id } = useParams();
	const [userId, setUserId] = useState<number | undefined>(undefined);

	useEffect(() => {
		const storedUserId = localStorage.getItem('userId');
		if (storedUserId) {
			setUserId(Number(storedUserId));
		}
	}, []);

	return (
		<div>
			{id}테스트
			<DateBadge text={`2025-02-14T04:48:55.087Z`} type={'date'} />
			<DateBadge text={`2025-02-14T04:48:55.087Z`} type={'time'} />
			<div>
				{mockData.map((item) => (
					<div key={item.id}>
						<LikeButton itemId={item.id} userId={userId} />
					</div>
				))}
			</div>
		</div>
	);
}
