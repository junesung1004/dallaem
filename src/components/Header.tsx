'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { isTokenExpired } from '@/api/getUserData';

export default function Header() {
	const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);
	const [isLoading, setIsLoading] = useState(true);

	//useEffect: 로그인 여부 확인하고 렌더링
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const token = localStorage.getItem('authToken');
			if (token && !isTokenExpired(token)) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
			setIsLoading(false);
		}
	}, []);

	return (
		<header className='flex flex-col justify-center w-full h-[60px] mx-auto p-2 pr-5  bg-orange-600 border-black border-b-2'>
			<nav className='md:mx-auto w-full  gap-4 lg:w-[996px] xl:w-[1198px] flex justify-between text-xs md:text-base lg:text-lg text-white'>
				<ul className='flex gap-2 sm:gap-4 lg:gap-5'>
					<li className='font-bold'>
						<Link href={'/'}>같이 달램</Link>
					</li>
					<li>
						<Link href={'/'}>모임 찾기</Link>
					</li>
					<li>
						<Link href={'/favorite-meetings'}>찜한 모임</Link>
					</li>
					<li>
						<Link href={'/all-reviews'}>모든 리뷰</Link>
					</li>
				</ul>

				<ul className='flex'>
					<li>
						<Link href={isLoggedIn ? '/mypage' : '/login'}>
							{isLoggedIn ? '마이페이지' : '로그인'}
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
