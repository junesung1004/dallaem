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
			initial: 'bg-orange-600 text-white',
			hover: 'hover:bg-orange-700 hover:text-white',
			active: 'active:bg-orange-800 active:text-white',
			disabled: 'bg-gray-400 text-white',
		},
		outline: {
			initial: 'bg-white text-orange-600 border border-orange-600',
			hover:
				'hover:bg-white hover:text-orange-500 hover:border hover:border-orange-500',
			active:
				'active:bg-white active:text-orange-700 active:border active:border-orange-700',
			disabled: 'bg-white text-gray-400 border border-gray-400',
		},
	};

	const buttonStateMap1 = {
		default: {
			initial: 'bg-orange-600 text-white',
			outlined: 'bg-white text-orange-600 border border-orange-600',
		},
		hover: {
			initial: 'bg-orange-700 text-white',
			outlined:
				'hover:bg-white hover:text-orange-500 hover:border hover:border-orange-500',
		},
		click: {
			initial: 'bg-orange-800 text-white',
			outlined:
				'active:bg-white active:text-orange-700 active:border active:border-orange-700',
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
