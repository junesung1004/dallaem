'use client';

import { useRouter } from 'next/navigation';

interface ButtonProps {
	text: string;
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
}

export default function Button({
	text,
	type = 'button',
	onClick,
}: ButtonProps) {
	const router = useRouter();

	// 기본 동작을 유지하면서, 다른 onClick이 있으면 실행
	const handleClick = () => {
		if (onClick) {
			onClick();
		} else {
			router.push('/createmodal');
		}
	};

	return (
		<div className='w-full flex'>
			<button
				type={type}
				className={`w-full px-4 py-2  text-white rounded
				${type === 'button' && 'bg-orange-600 h-[44px]'}
				${type === 'submit' && 'bg-slate-400 h-[40px]'}
				`}
				onClick={handleClick}
			>
				{text}
			</button>
		</div>
	);
}
