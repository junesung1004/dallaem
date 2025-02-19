import { Modal } from '@/components/Modal/Modal';
import ProfileForm from '../../components/ProfileForm/ProfileForm';
import dynamic from 'next/dynamic';

function Page() {
	// const Modal = dynamic(() => import('@/components/Modal/Modal'));
	return (
		<Modal isOpen={true}>
			<ProfileForm />
		</Modal>
	);
}

export default Page;
