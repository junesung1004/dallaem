import { Modal } from '@/components/Modal/Modal';
import ProfileForm from '../../components/ProfileForm/ProfileForm';

function Page() {
	return (
		<Modal isOpen={true}>
			<ProfileForm />
		</Modal>
	);
}

export default Page;
