'use client';

import { motion, useAnimation } from 'motion/react';
import { useEffect } from 'react';

interface ProgressBarProps {
	max: number;
	value: number;
	isNeutral?: boolean;
	isAnimate?: boolean;
}

function ProgressBar({
	max,
	value,
	isNeutral = false,
	isAnimate = true,
}: ProgressBarProps) {
	const controls = useAnimation();

	useEffect(() => {
		if (isAnimate) {
			controls.start('full');
		} else {
			controls.start({
				width: calculatePercentage(value, max),
				transition: {
					duration: 0,
				},
			});
		}
	}, [value]);

	/** 색상 적용 or 흑백 적용 */
	const thumb = isNeutral ? `bg-gray-900` : 'bg-orange-600';
	const bgBar = isNeutral ? `bg-gray-200` : 'bg-orange-50';

	/**
	 * 주어진 값(value)와 최대값(max)을 받아 백분율로 반환하는 함수
	 * @param {number} value - 현재 값
	 * @param {number} max - 최대 값
	 * @returns {number} 백분율 값 (0~100)
	 */
	function calculatePercentage(value: number, max: number): number {
		if (max === 0) return 0; // max 값이 0인 경우 0을 반환
		return (value / max) * 100;
	}

	const percentage = calculatePercentage(value, max);
	const variants = {
		full: {
			width: `${percentage}%`,
		},
		empty: {
			width: '0%',
		},
	};
	const duration = 2000;

	const controlProperty = {
		animate: controls,
		variants: variants,
		initial: isAnimate ? 'empty' : 'full',
	};

	return (
		<div className={`${bgBar} relative h-[4px] overflow-hidden rounded-md`}>
			<motion.div
				{...controlProperty}
				transition={{
					repeatType: 'loop',
					ease: 'linear',
					duration: duration / 1000,
				}}
				className={`${thumb} absolute top-0 left-0 h-full rounded-md`}
			/>
		</div>
	);
}

export default ProgressBar;
