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
			outlined: 'bt-white text-orange-600 border border-orange-600',
		},
		hover: {
			initial: 'bg-orange-700 text-white',
			outlined: 'bt-white text-orange-500 border border-orange-500',
		},
		click: {
			initial: 'bg-orange-800 text-white',
			outlined: 'bt-white text-orange-700 border border-orange-700',
		},
		disabled: {
			initial: 'bg-gray-400 text-white',
			outlined: 'bt-white text-gray-400 border border-gray-400',
		},
	};

	return (
		<button
			className={`
                inline-flex px-8 py-2 rounded-xl justify-center item-center
                ${buttonStateMap[state][isOutlined ? 'outlined' : 'initial']} 
                ${isFull ? 'w-full' : ''} 
                `}
			{...rest}
		>
			{children}
		</button>
	);
}

export default Button;
