'use client';
import { useRouter } from 'next/navigation';

export default function CreateModal() {
	const router = useRouter();
	return (
		<div className="flex justify-center items-center absolute z-50 w-full sm:w-full lg:w-[996px] xl:w-[1198px] min-h-screen mx-auto bg-black bg-opacity-20">
			<div className="p-20 mx-auto bg-white">
				<h1>모임 만들기</h1>
				<button
					className="p-10 mt-10 rounded-2xl bg-red-400"
					onClick={() => router.back()}
				>
					취소
				</button>
			</div>
		</div>
	);
}
