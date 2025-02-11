interface HideToggleInterface {
	onClick: () => void;
	isHidden: boolean;
}

const HideToggle = ({ onClick, isHidden }: HideToggleInterface) => {
	return (
		<img
			src={isHidden ? 'icons/visibilityOff.png' : 'icons/visibilityOn.png'}
			onClick={onClick}
		/>
	);
};

export { HideToggle };
