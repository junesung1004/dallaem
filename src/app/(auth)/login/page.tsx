'use client';
import { InputWindow } from '@/app/components/InputWindow';
import { Login } from '@/app/components/logIn/Login';
import React, { useEffect, useState } from 'react';

export default function LoginPage() {
	return (
<<<<<<< HEAD
		<main className='min-h-screen overflow-y-scroll md:w-[744px] lg:w-[996px] mx-auto flex flex-col gap-5 justify-center items-center md:flex-row'>
			<div className='w-[90%] md:w-[45%] mx-auto flex flex-col justify-center items-center mt-10'>
				<span className='text-xl'>Welcom to 같이달램!</span>
				<span className='text-sm mt-3'>바쁜 일상 속 잠깐의 휴식,</span>
				<span className='text-sm'>이제는 같이 달램과 함께 해보세요.</span>
				<img src='/images/imgLogin.png' alt='main image' />
=======
		<main className="min-h-screen overflow-y-scroll md:w-[744px] lg:w-[996px] mx-auto flex flex-col gap-5 justify-center items-center md:flex-row">
			<div className="w-[90%] md:w-[45%] mx-auto flex flex-col justify-center items-center mt-10">
				<span className="text-xl">Welcome to 같이달램!</span>
				<span className="text-sm mt-3">바쁜 일상 속 잠깐의 휴식,</span>
				<span className="text-sm">이제는 같이 달램과 함께 해보세요.</span>
				<img src="/images/imgLogin.png" alt="main image" />
>>>>>>> bfccc5836b037577e5f68a6d9fc0569f16a963fa
			</div>
			<div className='w-[90%] md:w-[45%] aspect-[1/1] mx-auto  '>
				<Login />
			</div>
		</main>
	);
}
