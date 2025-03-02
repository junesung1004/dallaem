import Link from 'next/link';

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	state?: 'default' | 'hover' | 'click' | 'disabled';
	isOutlined?: boolean;
	children: React.ReactNode;
	isFull?: boolean;
	variation?: 'default' | 'outline';
	href?: string;
}

function Button({
	children,
	state,
	variation = 'default',
	isOutlined,
	isFull,
	href,
	...rest
}: ButtonProps) {
	const buttonsStateMap = {
		default: {
			initial: 'bg-secondary-600 text-white',
			hover: 'hover:bg-secondary-700 hover:text-white',
			active: 'active:bg-primary-800 active:text-white',
			disabled: 'bg-gray-400 text-white',
		},
		outline: {
			initial: 'bg-white text-secondary-600 border border-secondary-600',
			hover:
				'hover:bg-white hover:text-primary-500 hover:border hover:border-primary-500',
			active:
				'active:bg-white active:text-secondary-700 active:border active:border-secondary-700',
			disabled: 'bg-white text-gray-400 border border-gray-400',
		},
	};

	const buttonStateMap1 = {
		default: {
			initial: 'bg-primary-600 text-white',
			outlined: 'bg-white text-primary-600 border border-primary-600',
		},
		hover: {
			initial: 'bg-primary-700 text-white',
			outlined:
				'hover:bg-white hover:text-primary-500 hover:border hover:border-primary-500',
		},
		click: {
			initial: 'bg-primary-800 text-white',
			outlined:
				'active:bg-white active:text-primary-700 active:border active:border-primary-700',
		},
		disabled: {
			initial: 'bg-gray-400 text-white',
			outlined: 'bg-white text-gray-400 border border-gray-400',
		},
	};

	// 기본 버튼 스타일
	const { initial, hover, active, disabled } = buttonsStateMap[variation];
	const buttonStyle = `${rest.disabled ? disabled : `${initial} ${hover} ${active}`}`;

	if (href) {
		return (
			<Link href={href} className={`btn-default ${buttonStyle}`}>
				{children}
			</Link>
		);
	}

	return (
		<button
			className={`
                btn-default
                ${isFull ? 'btn-full' : 'btn-default'}
								${buttonStyle}
                `}
			{...rest}
		>
			{children}
		</button>
	);
}

export default Button;
