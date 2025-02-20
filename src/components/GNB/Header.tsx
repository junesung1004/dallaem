'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { isTokenExpired } from '@/api/getUserData';
import { usePathname } from 'next/navigation';
import { useStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function Header() {
	const pathname = usePathname();
	const router = useRouter();
	//상태관리 변수 구독
	const isLoggedIn = useStore((state) => state.isLoggedIn);
	const setUserNull = useStore((state) => state.setUserNull);

	//함수: 로그아웃
	const logoutUser = () => {
		// 토큰  로컬스토리지에서 삭제
		localStorage.removeItem('authToken');
		// 상태관리 변수에서 삭제
		setUserNull();

		console.log('로그아웃 되었습니다. 홈으로 이동합니다');
		router.push('/'); // 홈으로 이동
	};

	//함수: 유효성 검증
	const validateToken = () => {
		const currentToken = useStore.getState().token; //최신 값 가져옴
		const currentIsLoggedIn = useStore.getState().isLoggedIn;
		const currentUserId = useStore.getState().userId;
		if (!currentToken) {
			setUserNull();
			console.log('현재 로그인 상태: 토큰 없음');
			return;
		}
		const isValid = !isTokenExpired(currentToken);
		if (!isValid) {
			setUserNull();
			console.log('현재 로그인 상태: 토큰 만료');
			return;
		}
		console.log(
			'현재 로그인 상태: ',
			currentIsLoggedIn,
			currentToken,
			currentUserId,
		);
	};

	//useEffect: 페이지 이동할 때마다 토큰 유효성 검증
	useEffect(() => {
		const { isLoggedIn, token, userId } = useStore.getState(); // 최신 상태 가져오기 (로그아웃, 새로고침 등 즉각 값 반영하여 렌더링)
		validateToken();
	}, [pathname]);

	//useEffect: 10분마다 토큰 유효성 검증
	useEffect(() => {
		const intervalId = setInterval(() => {
			const { isLoggedIn, token, userId } = useStore.getState(); // 최신 상태 가져오기
			validateToken();
		}, 600000);
		return () => clearInterval(intervalId);
	}, []);

	useEffect(() => {
		console.log('isLoggedIn 변경 감지:', isLoggedIn);
	}, [isLoggedIn]);

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
