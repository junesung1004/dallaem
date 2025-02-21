import { useAuthStore } from '@/store/useAuthStore';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/hooks/customs/useAuth';

const ProfileTooltip = () => {
	const { logoutUser } = useAuth();
	const { image, setImage } = useAuthStore();

	const [visible, setVisible] = useState(false);
	const toggleTooltip = () => setVisible((prev) => !prev);
	const hideTooltip = () => setVisible(false);
	const src = image ?? '/icons/profileDefault.svg';

	return (
		<div
			className='relative'
			onClick={toggleTooltip}
			onMouseLeave={hideTooltip}
			style={{
				width: 40,
				height: 40,
				backgroundImage: `url(/icons/profileDefault.svg)`,
				backgroundSize: 'cover', //배경 이미지가 div에 꽉 차도록
				backgroundPosition: 'center', // 이미지가 중앙에 위치하도록
				borderRadius: '50%', // 원형으로 만들기 (프로필 이미지 효과)
			}}
		>
			<Image src={src} alt={'profile image'} width={40} height={40} />
			{visible && (
				<div className='absolute flex flex-col bg-white text-gray-800 text-[14px] font-medium w-[110px] lg:w-[142px] right-[16px] mt-[8px] md:mt-[10px] shadow-xl rounded-lg'>
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
