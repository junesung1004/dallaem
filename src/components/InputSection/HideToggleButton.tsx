interface HideToggleProps {
	onClick: () => void;
	isHidden: boolean;
	className: string;
}

const HideToggleButton = ({
	onClick,
	isHidden,
	className,
}: HideToggleProps) => {
	return (
		<button onClick={onClick} className={className} type='button' tabIndex={-1}>
			<img
				src={isHidden ? 'icons/visibilityOff.png' : 'icons/visibilityOn.png'}
			/>
		</button>
	);
};

export { HideToggleButton };
