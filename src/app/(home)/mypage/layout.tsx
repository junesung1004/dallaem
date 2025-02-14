type Props = {
	children: React.ReactNode;
	review: React.ReactNode;
};

function ReviewLayout({ children, review }: Props) {
	return (
		<div>
			{children}
			{review}
		</div>
	);
}

export default ReviewLayout;
