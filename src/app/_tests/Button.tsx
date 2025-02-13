'use client';

import { useRouter } from 'next/navigation';

export default function Button() {
	const router = useRouter();

	return (
		<div className='flex justify-end'>
			<button
				className='px-4 py-2 h-12 bg-orange-600 text-white rounded'
				onClick={() => router.push('/createmodal')}
			>
				모임 만들기
			</button>
		</div>
	);
}
