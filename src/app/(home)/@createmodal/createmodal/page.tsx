'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import CreateMeetingForm from '../../_components/CreateMeetingForm';

export default function CreateModal() {
	const router = useRouter();

	return (
		<div className='flex justify-center absolute z-50 w-full sm:w-full lg:w-[996px] xl:w-[1198px] min-h-screen mx-auto bg-black bg-opacity-20'>
			<div className='bg-white p-3 relative w-[375px] h-[839px]'>
				<button
					onClick={() => router.back()}
					className='w-[24px] h-[24px] absolute right-5'
				>
					<Image src={'/icons/X.png'} alt='x 모양 아이콘' fill />
				</button>
				<CreateMeetingForm />
			</div>
		</div>
	);
}
