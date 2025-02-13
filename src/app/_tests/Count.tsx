'use client';

import React from 'react';
import { useCount } from '../store/useCount';

export default function Count() {
	const { count, increase, decrease } = useCount();
	return (
		<div className='pt-10 flex flex-col gap-5'>
			<h1>Count : {count}</h1>
			<button className='w-[150px] py-2 px-10 border-2' onClick={increase}>
				+ 버튼
			</button>
			<button className='w-[150px] py-2 px-10 border-2' onClick={decrease}>
				- 버튼
			</button>
		</div>
	);
}
