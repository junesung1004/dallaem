'use client';

import Dialog from '../Dialog/Dialog';
import type { ButtonContainerProps } from '../Dialog/Dialog';

type ButtonPosition = Pick<ButtonContainerProps, 'position'>['position'];

export interface ModalContentProps {
	content: React.ReactNode;
	confirmType: 'Alert' | 'Confirm';
	onConfirm: () => void;
	onDismiss?: () => void;
	buttonPosition?: ButtonPosition;
}

function ModalContent({
	content,
	confirmType,
	onConfirm,
	onDismiss,
	buttonPosition,
}: ModalContentProps) {
	return (
		<Dialog>
			<Dialog.Content>
				<div className='px-16 py-8 text-center'>{content}</div>
			</Dialog.Content>
			<Dialog.ButtonContainer position={buttonPosition}>
				{confirmType === 'Confirm' && onDismiss && (
					<Dialog.Button type='no' onClick={onDismiss}>
						취소
					</Dialog.Button>
				)}
				<Dialog.Button type='yes' onClick={onConfirm}>
					확인
				</Dialog.Button>
			</Dialog.ButtonContainer>
		</Dialog>
	);
}

export default ModalContent;
