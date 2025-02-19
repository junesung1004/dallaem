interface HideToggleInterface {
	onClick: () => void;
	isHidden: boolean;
	className: string;
}

const HideToggle = ({ onClick, isHidden, className }: HideToggleInterface) => {
	return (
		<img
			src={isHidden ? 'icons/visibilityOff.png' : 'icons/visibilityOn.png'}
			onClick={onClick}
			className={className}
		/>
	);
};

export { HideToggle };
