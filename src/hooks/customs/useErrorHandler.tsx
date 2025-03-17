import { useRouter } from 'next/navigation';
import { useGlobalModal } from './useGlobalModal';
import ErrorModalContent from '@/components/Modal/ErrorModalContent';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface ErrorMessageConfig {
	content: React.ReactNode;
	confirmType: 'Alert' | 'Confirm';
	onConfirm: (closeModal: () => void, router?: AppRouterInstance) => void;
	onDismiss?: (closeModal: () => void) => void;
}

const errorMessages: Record<string, ErrorMessageConfig> = {
	'token invalid': {
		content: <ErrorModalContent.Auth />,
		confirmType: 'Alert',
		onConfirm: (closeModal, router) => {
			closeModal();

			setTimeout(() => {
				if (router) {
					router.push('/login');
				}
			}, 1000);
		},
	},
	FORBIDDEN: {
		content: <ErrorModalContent.FORBIDDEN />,
		confirmType: 'Alert',
		onConfirm: (closeModal) => closeModal(),
		onDismiss: (closeModal) => closeModal(),
	},
	NOT_FOUND: {
		content: <ErrorModalContent.FORBIDDEN />,
		confirmType: 'Confirm',
		onConfirm: (closeModal) => closeModal(),
		onDismiss: (closeModal) => closeModal(),
	},
	ALREADY_REVIEWED: {
		content: <ErrorModalContent.ALREADY_REVIEWED />,
		confirmType: 'Confirm',
		onConfirm: (closeModal) => closeModal(),
		onDismiss: (closeModal) => closeModal(),
	},
};

export const useErrorHandler = () => {
	const { openModal, closeModal, closeAllModal } = useGlobalModal();
	const router = useRouter();

	const handleError = (error: Error) => {
		if (!(error instanceof Error)) {
			console.error('Unknown error');
			openModal({
				content: '문제가 발생하였습니다. 다시 시도해주세요',
				confirmType: 'Alert',
				onConfirm: closeModal,
			});
			return;
		}

		const errorDetails = errorMessages[error.message];
		if (errorDetails) {
			openModal({
				content: errorDetails.content,
				confirmType: errorDetails.confirmType,
				onConfirm: () => errorDetails.onConfirm(closeAllModal, router),
				onDismiss: errorDetails.onDismiss
					? () => errorDetails.onDismiss?.(closeModal)
					: undefined,
			});
		} else {
			console.error(error);
			openModal({
				content: '문제가 발생하였습니다. 다시 시도해주세요',
				confirmType: 'Alert',
				onConfirm: closeModal,
			});
		}
	};

	return { handleError };
};
