import Image from 'next/image';
import { forwardRef } from 'react';

interface PageNavButtonProps {
	id: string;
	label: string;
	icon?: string;
	isActive: boolean;
	onClick: () => void;
	variant?: 'main' | 'sub';
}

// forwardRef를 적용 - `ref`를 button에 전달
const PageNavButton = forwardRef<HTMLButtonElement, PageNavButtonProps>(
	({ id, label, icon, isActive, onClick, variant = 'main' }, ref) => {
		const mainButtonClass = `relative text-lg py-2 mr-4 font-bold ${
			isActive ? 'text-black' : 'text-gray-400'
		}`;

		const subButtonClass = `text-sm font-medium mr-2 px-2 py-1 sm:px-4 sm:px-2 h-[36px] sm:h-[40px] rounded-[12px] ${
			isActive ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'
		}`;

		const buttonClass = variant === 'main' ? mainButtonClass : subButtonClass;

		const buttonElement = (
			<button ref={ref} className={buttonClass} onClick={onClick}>
				<div className='flex items-center transition-all'>
					{label}
					{icon && (
						<Image
							src={icon}
							alt={id}
							width={32}
							height={32}
							className={` ${isActive ? 'opacity-100' : 'opacity-50'}`}
						/>
					)}
				</div>
			</button>
		);

		return buttonElement;
	},
);

PageNavButton.displayName = 'PageNavButton';
export default PageNavButton;
