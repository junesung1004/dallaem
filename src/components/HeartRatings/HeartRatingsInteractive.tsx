'use client';

import { useState } from 'react';
import Heart from './Heart';

interface HeartRatingsInteractiveProps {
	maxHearts: number;
	rating: number;
}

export default function HeartRatingsInteractive({
	maxHearts,
	rating,
}: HeartRatingsInteractiveProps) {
	const [selectedRating, setSelectedRating] = useState(rating);

	return (
		<div className='flex'>
			{Array.from({ length: maxHearts }, (_, i) => (
				<label key={i} className='cursor-pointer'>
					<Heart
						key={i}
						value={1}
						isAnimate={i < Math.ceil(selectedRating) ? true : false}
						isMask={false}
						maskId={i}
					/>
					<input
						type='radio'
						name='ratings'
						value={i + 1}
						onChange={(e) => setSelectedRating(Number(e.currentTarget.value))}
						className='hidden'
					/>
				</label>
			))}
		</div>
	);
}
