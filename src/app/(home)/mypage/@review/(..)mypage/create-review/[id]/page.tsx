import ReviewForm from '@/app/(home)/mypage/components/ReviewForm/ReviewForm';
import { Modal } from '@/components/Modal/Modal';

function Page() {
	return (
		<Modal isOpen={true}>
			<ReviewForm />
		</Modal>
	);
}

export default Page;
