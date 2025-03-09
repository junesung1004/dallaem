'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/hooks/customs/useAuth';
import { IUser } from '@/types/userType';
import { getUserData } from '@/api/getUserData';
import { usePathname } from 'next/navigation';

const ProfileTooltip = () => {
	const { logoutUser } = useAuth();
	const [data, setData] = useState<IUser | null>(null);
	const [visible, setVisible] = useState(false);

	const pathname = usePathname();

	const getData = async () => {
		const userData = await getUserData();
		setData(userData);
	};

	/** 임시 */
	useEffect(() => {
		if (pathname === '/mypage') {
			getData();
		}
	}, [pathname]);

	/** 임시 */
	useEffect(() => {
		getData();
	}, []);

	if (!data) return null; // 여기에서 return null을 해야 함

	const image = data.image ?? '/icons/profileDefault.svg';

	const toggleTooltip = () => setVisible((prev) => !prev);

	console.log('Profile Image: ', image);
	return (
		<div
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
				src={image}
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
