import { motion, animate, useMotionValue, useTransform } from 'motion/react';
import { useEffect } from 'react';

interface MembersProps {
	max: number;
	value: number;
	highLight?: 'on' | 'off';
}

function Members({ max, value, highLight }: MembersProps) {
	let maxCount = max;
	let curCount = value;
	const styleProp = {
		textColor: 'text-gray-700',
		fillColor: 'fill-gray-700',
	};

	// number 가 아니면 둘다 0으로 초기화
	if (typeof max !== 'number' || typeof value !== 'number') {
		maxCount = 0;
		curCount = 0;
	}

	if (max < 0 || value < 0) {
		maxCount = 0;
		curCount = 0;
	}

	// 들어온 값이 최대 인원을 초과할 경우 최대 인원까지만 표시
	if (value >= max) {
		curCount = Math.min(...[max, value].map((num) => Math.floor(num)));
		// heighLight 값이 지정되지 않으면 기본 유지
		styleProp.fillColor =
			highLight === 'off' ? styleProp.fillColor : 'fill-primary-400';
		styleProp.textColor =
			highLight === 'off' ? styleProp.textColor : 'text-primary-400';
	}

	const count = useMotionValue(0);
	const animatedCount = useTransform(count, (latest) => Math.floor(latest));

	useEffect(() => {
		animate(count, curCount, { duration: 1, ease: 'easeOut' });
	}, [curCount]);

	return (
		<div className='flex items-center'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='16'
				height='16'
				viewBox='0 0 16 16'
				fill='none'
				className={styleProp.fillColor}
			>
				<circle cx='7.99967' cy='5.33335' r='2.66667' fill='current' />
				<path
					d='M3.55826 11.5471C3.99899 9.68459 5.84749 8.66669 7.76139 8.66669H8.23796C10.1519 8.66669 12.0004 9.68459 12.4411 11.5471C12.5264 11.9074 12.5941 12.2846 12.6323 12.6678C12.6687 13.0342 12.3679 13.3334 11.9997 13.3334H3.99967C3.63148 13.3334 3.33062 13.0342 3.36708 12.6678C3.40521 12.2846 3.47299 11.9074 3.55826 11.5471Z'
					fill='current'
				/>
			</svg>
			<span className={`${styleProp.textColor} font-medium`}>
				<motion.span>{animatedCount}</motion.span>/{maxCount}
			</span>
		</div>
	);
}

export default Members;
