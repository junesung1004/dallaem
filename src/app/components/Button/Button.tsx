interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	state: 'default' | 'hover' | 'click' | 'disabled';
	isOutlined: boolean;
	children: React.ReactNode;
	isFull?: boolean;
}

function Button({ children, state, isOutlined, isFull, ...rest }: ButtonProps) {
	const buttonStateMap = {
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

	const hoverProp = isOutlined
		? `hover:${buttonStateMap['hover']['outlined']} hover:outline`
		: `hover:${buttonStateMap['hover']['initial']} hover:no-outline`;

	const activeProp = isOutlined
		? `active:${buttonStateMap['click']['outlined']} active:outline`
		: `active:${buttonStateMap['click']['initial']} active:no-outline`;

	return (
		<button
			className={`
                inline-flex px-8 py-2 rounded-xl justify-center item-center
                ${buttonStateMap[state][isOutlined ? 'outlined' : 'initial']} 
                ${isFull ? 'w-full' : ''} 
				${hoverProp}
				${activeProp}
                `}
			{...rest}
		>
			{children}
		</button>
	);
}

export default Button;
