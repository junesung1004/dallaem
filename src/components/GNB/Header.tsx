'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { useAuth } from '@/hooks/customs/useAuth';
import Link from 'next/link';
import React from 'react';

export default function Header() {
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	const { logoutUser } = useAuth();
	return (
		<header className='flex flex-col justify-center w-full h-[56px] md:h-[60px] mx-auto bg-orange-600 border-black border-b-2 px-4 md:px-6 lg:px-[106px]'>
			<div className='max-w-[1200px] w-full mx-auto'>
				<nav className='md:mx-auto w-full gap-4 lg:w-[996px] xl:w-[1198px] flex justify-between text-xs md:text-base lg:text-lg text-white'>
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

					<ul className='flex gap-2 sm:gap-4 lg:gap-5'>
						<li>
							<Link href={isLoggedIn ? '/mypage' : '/login'}>
								{isLoggedIn ? '마이페이지' : '로그인'}
							</Link>
						</li>
						{isLoggedIn && (
							<li>
								<button onClick={logoutUser}>로그아웃</button>
							</li>
						)}
					</ul>
				</nav>
			</div>
		</header>
	);
}
