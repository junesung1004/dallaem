'use client';

function Dialog({ children }: { children: React.ReactNode }) {
	return <div>{children}</div>;
}

function Content({
	children,
	title,
}: {
	children: React.ReactNode;
	title?: string;
}) {
	return (
		<div className='flex flex-col gap-4'>
			<h4>{title}</h4>
			<div className='flex flex-col gap-2'>{children}</div>
		</div>
	);
}

function Button({
	onClick,
	type,
	text,
}: {
	onClick: () => void;
	type: 'yes' | 'no';
	text: string;
}) {
	const buttonColor = type === 'yes' ? 'bg-white' : 'bg-orange-400';
	return (
		<button className={buttonColor} onClick={onClick}>
			{text}
		</button>
	);
}

function ButtonContainer() {}

Dialog.Content = Content;
Dialog.ButtonContainer = ButtonContainer;
Dialog.Button = Button;

export default Dialog;
