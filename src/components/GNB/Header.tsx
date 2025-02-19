'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { isTokenExpired } from '@/api/getUserData';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
	const pathname = usePathname();
	const router = useRouter();
	const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);

	const logoutUser = () => {
		localStorage.removeItem('authToken'); // 토큰 삭제
		setIsLoggedIn(false);
		console.log('로그아웃 되었습니다. 홈으로 이동합니다');
		router.push('/'); // 홈으로 이동
	};

	//useEffect: 로그인 여부 확인하고 렌더링
	useEffect(() => {
		const token = localStorage.getItem('authToken');
		if (!token) {
			setIsLoggedIn(false);
			return;
		}
		const isValid = !isTokenExpired(token);
		//토큰 유효 여부가 달라진 경우에만 재렌더링
		setIsLoggedIn((prev) => (prev === isValid ? prev : isValid));
	}, [pathname]);

	return (
		<header className='flex flex-col justify-center w-full h-[56px] md:h-[60px] mx-auto bg-orange-600 border-black border-b-2 px-4 md:px-6 lg:px-[106px] py-10'>
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
