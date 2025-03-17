'use client';

import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation'; // 현재 경로 가져오기
import { ProfileTooltip } from '@/components/GNB/ProfileTooltip';
import { useLikeNotify } from '@/hooks/customs/useLikeNotify';
import Badge from '../Badge/Badge';
import Image from 'next/image';

export default function Header() {
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	const pathname = usePathname(); // 현재 페이지 경로
	const { likeNotification } = useLikeNotify();

	return (
		<header className='flex items-center justify-center w-full h-[56px] md:h-[60px] bg-gradient-to-r from-primary-600 to-secondary-600 border-black border-b-2 px-4 md:px-6 lg:px-[106px]'>
			<div className='max-w-[1200px] w-full flex items-center justify-between'>
				<div className='mr-2'>
					<Link href={'/'}>
						<Image
							src='/images/logo/logo.png'
							alt='logo'
							width={100}
							height={48}
						/>
					</Link>
				</div>
				<nav className='flex-1 flex'>
					<ul className='flex gap-4 md:gap-4 lg:gap-6 text-xs md:text-base lg:text-lg text-white font-semibold'>
						<li>
							<Link
								href={'/'}
								className={pathname === '/' ? 'text-gray-900' : ''}
							>
								모임 찾기
							</Link>
						</li>
						<li className='flex items-center gap-2'>
							<Link
								href={'/favorite-meetings'}
								className={
									pathname === '/favorite-meetings' ? 'text-gray-900' : ''
								}
							>
								찜한 모임
							</Link>
							{likeNotification.hasNotification && (
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
				</nav>
				<div className='flex-shrink-0'>
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
				</div>
			</div>
		</header>
	);
}
