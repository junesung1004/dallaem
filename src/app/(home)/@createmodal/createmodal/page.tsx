'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import CreateMeetingForm from '../../_components/CreateMeetingForm';

export default function CreateModal() {
	const router = useRouter();

	return (
		<div className='fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-20 w-screen h-screen overflow-auto'>
			<div className='bg-white sm:rounded-xl sm:p-6 xs:p-3 sm:top-[10px] relative sm:w-[520px] xs:w-[375px] xs:max-h-screen sm:h-[855px] overflow-auto'>
				{/* 닫기 버튼 */}
				<button
					onClick={() => router.back()}
					className='w-[24px] h-[24px] absolute right-5 top-5'
				>
					<Image src={'/icons/X.png'} alt='닫기 버튼' width={24} height={24} />
				</button>

				{/* 모임 생성 폼 */}
				<CreateMeetingForm />
			</div>
		</div>
	);
}
