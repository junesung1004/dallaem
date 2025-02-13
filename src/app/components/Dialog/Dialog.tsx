'use client';

import GlobalButton from '@/app/components/Button/Button';

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
			{title && <h4 className='inline-block max-w-[80%]'>{title}</h4>}
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
	const buttonProp = {
		state: 'default',
		isOutlined: type === 'no' ? true : false,
	};
	return (
		<GlobalButton {...buttonProp} onClick={onClick}>
			{text}
		</GlobalButton>
	);
}

function ButtonContainer({ children }: { children: React.ReactNode }) {
	return <div className='flex gap-2'>{children}</div>;
}

Dialog.Content = Content;
Dialog.ButtonContainer = ButtonContainer;
Dialog.Button = Button;

export default Dialog;
