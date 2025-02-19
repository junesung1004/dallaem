'use client';

import { ComponentRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import Image from 'next/image';

export default function Modal({
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
					<dialog
						ref={dialogRef}
						className={`p-4 rounded-md ${backDrop} fixed`}
					>
						<button onClick={onDismiss} className='absolute m-4 top-0 right-0'>
							<Image src='/icons/X.png' alt='닫기' width={20} height={20} />
						</button>
						<div className='flex justify-center items-center'>{children}</div>
					</dialog>
				</div>,
				document.getElementById('modal-root')!,
			)
		: null;
}
