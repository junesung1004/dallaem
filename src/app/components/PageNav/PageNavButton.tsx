import Image from 'next/image';
import Link from 'next/link';
import { forwardRef } from 'react';

interface PageNavButtonProps {
	id: string;
	label: string;
	icon?: string;
	isActive: boolean;
	onClick: () => void;
	href?: string;
	variant?: 'main' | 'sub';
}

// forwardRef를 적용 - `ref`를 button에 전달
const PageNavButton = forwardRef<HTMLButtonElement, PageNavButtonProps>(
	({ id, label, icon, isActive, onClick, href, variant = 'main' }, ref) => {
		const mainButtonClass = `relative text-lg py-2 mr-4 font-bold ${
			isActive ? 'text-black' : 'text-gray-400'
		}`;

		const subButtonClass = `px-4 py-2 mr-2 rounded-[12px] ${
			isActive ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'
		}`;

		const buttonClass = variant === 'main' ? mainButtonClass : subButtonClass;

		const buttonElement = (
			<button ref={ref} className={buttonClass} onClick={onClick}>
				<div className='flex items-center'>
					{label}
					{icon && <Image src={icon} alt={id} width={32} height={32} />}
				</div>
			</button>
		);

		return href ? (
			<Link key={id} href={href} passHref>
				{buttonElement}
			</Link>
		) : (
			buttonElement
		);
	},
);

//forwardRef 사용 시 displayName을 설정하는 것이 좋음
PageNavButton.displayName = 'PageNavButton';

export default PageNavButton;
