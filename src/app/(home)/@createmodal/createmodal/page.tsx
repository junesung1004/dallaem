'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import CreateMeetingForm from '../../_components/CreateMeetingForm';

export default function CreateModal() {
	const router = useRouter();

	return (
		<div className='fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-20 w-screen h-screen overflow-auto'>
			<div className='bg-white md:rounded-xl sm:p-6 xs:p-3 sm:top-[94px] md:top-[30px] relative md:w-[520px] sm:w-[375px] xs:max-h-screen sm:h-[795px] overflow-auto'>
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
