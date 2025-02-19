import { Signup } from '@/components/Signup/Signup';
import React from 'react';

export default function SignupPage() {
	return (
		<div className='flex flex-col gap-2.5 lg:gap-[6.375rem] items-center lg:flex-row lg:h-screen lg:px-[296px]'>
			<div className='flex flex-col items-center pt-2.5 md:pt-[2.5rem]'>
				<span className='text-[20px] md:text-2xl'>Welcome to 같이달램!</span>
				<div className='text-sm md:text-base'>
					<p>바쁜 일상 속 잠깐의 휴식,</p>
					<p>이제는 같이 달램과 함께 해보세요.</p>
				</div>
				<img
					src='/images/imgLogin.png'
					alt='main image'
					className='px-[1.625rem] md:px-[6.5rem]  pt-2'
				/>
			</div>
			<div className='w-full h-auto md:max-w-[608px] lg:max-w-[510px]'>
				<Signup />
			</div>
		</div>
	);
}
