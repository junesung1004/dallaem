import { Login } from '@/components/Login/Login';

import React from 'react';

export default function SignupPage() {
	return (
		<div className='flex flex-col gap-2.5 lg:gap-[6.375rem] items-center lg:flex-row lg:h-screen lg:px-[296px]'>
			{/* flex-wrap은, lg 화면에서 100vh center 정렬 <-> lg 이하 화면에서 정렬이 충돌해서 사용하지 않았습니다. 
			 content-center 등 다양한 값 사용해봤지만 두 조건 다 충족시키는 속성이 없습니다 ㅠ 그래서 반응형으로 제작합니다*/}
			<div className='flex flex-col items-center pt-2.5 md:pt-[2.5rem] '>
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
				<Login />
			</div>
		</div>
	);
}
