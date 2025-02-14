'use client';

import GlobalButton from '@/components/Button/Button';
import type { ButtonProps } from '../Button/Button';

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
	children,
}: {
	onClick: () => void;
	type: 'yes' | 'no';
	children: React.ReactNode;
}) {
	const buttonProp: Pick<ButtonProps, 'state' | 'isOutlined'> = {
		state: 'default',
		isOutlined: type === 'no' ? true : false,
	};
	return (
		<GlobalButton {...buttonProp} onClick={onClick}>
			{children}
		</GlobalButton>
	);
}

export interface ButtonContainerProps {
	children: React.ReactNode;
	position?: 'left' | 'right' | 'center';
}

function ButtonContainer({
	children,
	position = 'center',
}: ButtonContainerProps) {
	const positionMap = {
		left: 'justify-start',
		right: 'justify-end',
		center: 'justify-center',
	};

	return (
		<div className={`flex gap-2 ${positionMap[position]}`}>{children}</div>
	);
}

Dialog.Content = Content;
Dialog.ButtonContainer = ButtonContainer;
Dialog.Button = Button;

export default Dialog;
