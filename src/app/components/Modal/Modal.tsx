'use client';

import { ComponentRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import Image from 'next/image';

export function Modal({
	children,
	isOpen,
	noBackDrop,
	onClose,
}: {
	children: React.ReactNode;
	isOpen?: boolean;
	noBackDrop?: boolean;
	onClose?: () => void;
}) {
	const router = useRouter();
	const dialogRef = useRef<ComponentRef<'dialog'>>(null);

	useEffect(() => {
		if (isOpen && !dialogRef.current?.open) {
			dialogRef.current?.showModal();
		}
	}, [isOpen]);

	const onDismiss = () => {
		if (onClose && typeof onClose === 'function') {
			onClose();
		} else {
			router.back();
		}
	};

	const backDrop = noBackDrop
		? 'backdrop:bg-transparent backdrop:backdrop-blur-sm'
		: 'backdrop:bg-black/50';

	return isOpen
		? createPortal(
				<div className=''>
					<dialog ref={dialogRef} className={`p-4 rounded-md ${backDrop}`}>
						{children}
						<button onClick={onDismiss} className='absolute top-0 right-0 p-4'>
							<Image src='/icons/X.png' alt='닫기' width={20} height={20} />
						</button>
					</dialog>
				</div>,
				document.getElementById('modal-root')!,
			)
		: null;
}
