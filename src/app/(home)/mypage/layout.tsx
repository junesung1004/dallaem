type Props = {
	children: React.ReactNode;
	review: React.ReactNode;
	profile: React.ReactNode;
};

function ReviewLayout({ children, review, profile }: Props) {
	return (
		<div>
			{children}
			{review}
			{profile}
		</div>
	);
}

export default ReviewLayout;
