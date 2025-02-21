'use client';

import Button from '@/components/Button/Button';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function HomeButton() {
	const router = useRouter();
	return (
		<Button onClick={() => router.push('/createmodal')}>모임 만들기</Button>
	);
}
