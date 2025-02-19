'use client';

import { ChangeEvent, useState } from 'react';
import Heart from './Heart';

interface HeartRatingsInteractiveProps {
	maxHearts: number;
	rating: number;
	handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function HeartRatingsInteractive({
	maxHearts,
	rating,
	handleChange,
}: HeartRatingsInteractiveProps) {
	const [selectedRating, setSelectedRating] = useState(rating);
	const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (typeof handleChange === 'function') {
			handleChange(e);
		}
		setSelectedRating(Number(e.target.value));
	};

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
						name='score'
						value={i + 1}
						onChange={changeHandler}
						className='hidden'
					/>
				</label>
			))}
		</div>
	);
}
