'use client';

import { ReactNode, useState } from 'react';

interface HeartRatingsProps {
	rating?: number;
	maxHearts: number;
	renderHeart: (
		value: number,
		maskKey: number,
		isAnimate: boolean,
		onChange?: (e: React.FormEvent<HTMLInputElement>) => void,
	) => ReactNode;
}

function HeartRatings({ rating, maxHearts, renderHeart }: HeartRatingsProps) {
	// 현재 평점 state
	const [score, setScore] = useState(rating || 0);

	// 하트 채움 여부
	const heartFill = Array.from({ length: maxHearts }, (_, i) => {
		return Math.max(0, Math.min(1, score - i)); // 0~1 사이 값 보정
	});

	// 평점이 없으면 value 값을 0으로 보낸다
	const handleScore = (e: React.FormEvent<HTMLInputElement>) => {
		setScore(Number(e.currentTarget.value));
	};

	return (
		<div className='flex gap-1'>
			{heartFill.map((fill, index) => {
				/** 평점 아이템 별로 받아야하는 점수, 아이템 식별자, 애니메이팅 여부를 전달 */
				return renderHeart(
					fill || 0,
					index + 1,
					index < Math.ceil(score) ? true : false,
					handleScore,
				);
			})}
		</div>
	);
}

function Heart({
	isAnimate,
	isMask,
	value,
	maskId,
}: {
	isAnimate: boolean;
	isMask: boolean;
	value: number;
	maskId: number;
}) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='21'
			height='18'
			viewBox='0 0 21 18'
			fill='none'
			className='transition-all duration-300 ease-in-out transform'
		>
			{isMask && (
				<defs>
					<mask id={`mask-${maskId}`}>
						<rect x='0' y='0' width='21' height='18' fill='white' />
						<rect x={21 * value} y='0' width='21' height='18' fill='black' />
					</mask>
				</defs>
			)}
			<path
				d='M20.1 6.1C20 2.7 17.3 0 13.9 0C12.8 0 11.1 0.8 10.4 2.1C10.3 2.4 9.9 2.4 9.8 2.1C9 0.9 7.4 0.1 6.2 0.1C2.9 0.1 0.1 2.8 0 6.1V6.3C0 8 0.7 9.6 1.9 10.8C1.9 10.8 1.9 10.8 1.9 10.9C2 11 6.8 15.2 9 17.1C9.6 17.6 10.5 17.6 11.1 17.1C13.3 15.2 18 11 18.2 10.9C18.2 10.9 18.2 10.9 18.2 10.8C19.4 9.7 20.1 8.1 20.1 6.3V6.1Z'
				fill='#E5E7EB'
			/>
			<path
				d='M20.1 6.1C20 2.7 17.3 0 13.9 0C12.8 0 11.1 0.8 10.4 2.1C10.3 2.4 9.9 2.4 9.8 2.1C9 0.9 7.4 0.1 6.2 0.1C2.9 0.1 0.1 2.8 0 6.1V6.3C0 8 0.7 9.6 1.9 10.8C1.9 10.8 1.9 10.8 1.9 10.9C2 11 6.8 15.2 9 17.1C9.6 17.6 10.5 17.6 11.1 17.1C13.3 15.2 18 11 18.2 10.9C18.2 10.9 18.2 10.9 18.2 10.8C19.4 9.7 20.1 8.1 20.1 6.3V6.1Z'
				className='transition-all duration-500 ease-in-out fill-orange-600'
				mask={isMask ? `url(#mask-${maskId})` : ''}
				style={{
					clipPath: isAnimate
						? 'circle(100% at 50% 50%)'
						: `circle(0% at 50% 50%)`,
					opacity: isAnimate ? 1 : 0,
				}}
			/>
		</svg>
	);
}

HeartRatings.Heart = Heart;

export default HeartRatings;
