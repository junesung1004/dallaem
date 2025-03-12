'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/hooks/customs/useAuth';
import { useProfile } from '@/store/useAuthStore';
import { useState, useEffect, useRef } from 'react';

const ProfileTooltip = () => {
	const { logoutUser } = useAuth();
	const [visible, setVisible] = useState(false);

	const { image } = useProfile();
	const src = image ?? '/icons/profileDefault.svg';
	const toggleTooltip = () => setVisible((prev) => !prev);
	const tooltipRef = useRef<HTMLDivElement>(null); // 참조 생성

	// 외부 클릭 감지
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!tooltipRef.current) return; // 🔥 `null` 체크 추가
			if (!tooltipRef.current.contains(event.target as Node)) {
				setVisible(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div
			ref={tooltipRef}
			className='relative '
			onClick={toggleTooltip}
			style={{
				width: 40,
				height: 40,
				backgroundImage: `url(/icons/profileDefault.svg)`,
				backgroundSize: 'cover', //배경 이미지가 div에 꽉 차도록
				backgroundPosition: 'center', // 이미지가 중앙에 위치하도록
				borderRadius: '50%', // 원형으로 만들기 (프로필 이미지 효과)
			}}
		>
			<Image
				src={src}
				alt=''
				fill
				className='object-cover rounded-full overflow-hidden'
			/>
			{visible && (
				<div className='absolute flex flex-col bg-white text-gray-800 text-[14px] font-medium w-[110px] lg:w-[142px] right-[16px] mt-[44px] md:mt-[50px] shadow-xl rounded-lg z-10'>
					<Link
						href='/mypage'
						className='mx-auto h-[40px] lg:h-[44px] flex items-center'
					>
						마이페이지
					</Link>
					<button onClick={logoutUser} className='h-[40px] lg:h-[44px]'>
						로그아웃
					</button>
				</div>
			)}
		</div>
	);
};

export { ProfileTooltip };
