interface HideToggleInterface {
	onClick: () => void;
	isHidden: boolean;
	className: string;
}

const HideToggleButton = ({
	onClick,
	isHidden,
	className,
}: HideToggleInterface) => {
	return (
		<button onClick={onClick}>
			<img
				src={isHidden ? 'icons/visibilityOff.png' : 'icons/visibilityOn.png'}
				className={className}
			/>
		</button>
	);
};

export { HideToggleButton };
