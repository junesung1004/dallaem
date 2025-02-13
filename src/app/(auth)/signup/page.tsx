import { Signup } from '@/app/components/signup/Signup';
import React from 'react';

export default function SignupPage() {
	return (
		<main className='min-h-screen overflow-y-scroll md:w-[744px] lg:w-[996px] mx-auto mt-3 flex flex-col gap-5 justify-center items-center md:flex-row'>
			<div className='w-[90%] md:w-[45%] mx-auto flex flex-col justify-center items-center mt-10'>
				<span className='text-xl'>Welcome to 같이달램!</span>
				<span className='text-sm mt-3'>바쁜 일상 속 잠깐의 휴식,</span>
				<span className='text-sm'>이제는 같이 달램과 함께 해보세요.</span>
				<img src='/images/imgLogin.png' alt='main image' />
			</div>
			<div className='w-[90%] md:w-[45%] aspect-[3/5] md:aspect-[1/2] mx-auto  '>
				<Signup />
			</div>
		</main>
	);
}
