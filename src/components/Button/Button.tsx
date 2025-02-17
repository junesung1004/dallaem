export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	state: 'default' | 'hover' | 'click' | 'disabled';
	isOutlined: boolean;
	children: React.ReactNode;
	isFull?: boolean;
	variation?: 'default' | 'outline';
}

function Button({
	children,
	state,
	variation = 'default',
	isOutlined,
	isFull,
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
			initial: 'bg-orange-600 text-white',
			hover: 'hover:bg-orange-700 hover:text-white',
			active: 'active:bg-orange-800 active:text-white',
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
			outlined: 'bg-white text-orange-500 border border-orange-500',
		},
		click: {
			initial: 'bg-orange-800 text-white',
			outlined: 'bg-white text-orange-700 border border-orange-700',
		},
		disabled: {
			initial: 'bg-gray-400 text-white',
			outlined: 'bg-white text-gray-400 border border-gray-400',
		},
	};

	// 기본 버튼 스타일
	const { initial, hover, active, disabled } = buttonsStateMap[variation];
	const buttonStyle = `${initial} ${hover} ${active} ${rest.disabled ? disabled : ''}`;

	return (
		<button
			className={`
                inline-flex px-[3rem] py-2 rounded-xl justify-center item-center
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
