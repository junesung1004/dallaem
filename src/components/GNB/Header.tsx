'use client';

import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation'; // 현재 경로 가져오기
import { ProfileTooltip } from '@/components/GNB/ProfileTooltip';
import { useLikeNotify } from '@/hooks/customs/useLikeNotify';
import Badge from '../Badge/Badge';

export default function Header() {
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	const pathname = usePathname(); // 현재 페이지 경로
	const { likeNotification } = useLikeNotify();

	return (
		<header className='flex items-center justify-center w-full h-[56px] md:h-[60px] bg-gradient-to-r from-primary-600 to-secondary-600 border-black border-b-2 px-4 md:px-6 lg:px-[106px]'>
			<div className='max-w-[1200px] w-full'>
				<nav className='md:mx-auto w-full flex justify-between items-center text-xs md:text-base lg:text-lg text-white font-semibold'>
					<ul className='flex gap-2 sm:gap-4 lg:gap-5'>
						<li className='font-extrabold'>
							<Link href={'/'}>같이 달램</Link>
						</li>
						<li>
							<Link
								href={'/'}
								className={pathname === '/' ? 'text-gray-900' : ''}
							>
								모임 찾기
							</Link>
						</li>
						<li className='flex items-center gap-[5px]'>
							<Link
								href={'/favorite-meetings'}
								className={
									pathname === '/favorite-meetings' ? 'text-gray-900' : ''
								}
							>
								찜한 모임
							</Link>
							{isLoggedIn && likeNotification.hasNotification && (
								<Badge content={likeNotification.count} />
							)}
						</li>
						<li>
							<Link
								href={'/all-reviews'}
								className={pathname === '/all-reviews' ? 'text-gray-900' : ''}
							>
								모든 리뷰
							</Link>
						</li>
					</ul>

					<ul className='flex gap-2 sm:gap-4 lg:gap-5'>
						<li>
							{isLoggedIn ? (
								<ProfileTooltip />
							) : (
								<Link
									href='/login'
									className={pathname === '/login' ? 'text-gray-900' : ''}
								>
									로그인
								</Link>
							)}
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}
