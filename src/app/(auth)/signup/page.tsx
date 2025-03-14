import { Signup } from '@/components/Signup/Signup';
import React from 'react';

export default function SignupPage() {
	return (
		<div className='flex flex-col gap-2.5 lg:gap-[104px] items-center lg:flex-row lg:h-screen lg:px-[296px]'>
			<div className='flex flex-col items-center pt-2.5 md:pt-[2.5rem]'>
				<span className='text-[20px] md:text-2xl'>Welcome to 마음달램!</span>
				<div className='text-sm md:text-base'>
					<p>마음이 지칠 땐 함께할 친구가 필요하죠?</p>
					<p>함께하면 마음이 더 따뜻해질 거예요</p>
				</div>
				<img
					src='/images/imgLogin.png'
					alt='main image'
					className='md:px-[104px] lg:px-0 pt-2'
				/>
			</div>
			<div className='w-full h-auto md:max-w-[608px] lg:max-w-[510px] mb-[58px]'>
				<Signup />
			</div>
		</div>
	);
}
