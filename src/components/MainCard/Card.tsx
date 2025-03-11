import Image from 'next/image';
import React from 'react';

import { motion } from 'framer-motion';
import { LikeButton } from '../Button/LikeButton';

export default function Card({
	children,
	registrationEnd,
	onClick,
	id,
}: {
	children: React.ReactNode;
	registrationEnd: boolean;
	id: number;
	onClick?: () => void;
}) {
	return (
		<section
			onClick={onClick}
			className={`
				transition-shadow duration-300 ease-in-out hover:shadow-md hover:shadow-gray-400
				flex flex-col md:flex-row h-[316px] md:h-[156px] w-full  border-2 cursor-pointer rounded-[24px] mt-6 relative overflow-hidden
				`}
		>
			{children}
			{registrationEnd && (
				<div className='absolute bg-black bg-opacity-80 inset-0 flex items-center justify-center text-white'>
					<div className='text-center'>
						<p>마감된 챌린지예요,</p>
						<p>다음 기회에 만나요 🙏</p>
						{/* 작은 화면에서는 작은 아이콘, 큰 화면에서는 큰 아이콘. */}
						<div className='cursor-pointer'>
							<LikeButton itemId={id} registrationEnd={registrationEnd} />
						</div>
					</div>
				</div>
			)}
		</section>
	);
}

function ImageContainer({ children }: { children: React.ReactNode }) {
	return <div className='relative'>{children}</div>;
}

//이미지 섹션
function ImageSection({ src, alt }: { src: string; alt: string }) {
	return (
		<div className='w-full md:w-[256px] h-[156px] bg-white sm:border-r-2 relative'>
			<Image
				alt={alt}
				src={src}
				fill
				priority
				className='h-full w-full object-fit'
				sizes='(max-width: 640px) 343px, (max-width: 1024px) 280px, 100vw'
			/>
		</div>
	);
}

// 카드 내부 컨텐츠 섹션
function Content({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex-1 p-4 '>
			{/* top && bottom layout  */}
			{children}
		</div>
	);
}

//카드 상단 정보
function Header({ children }: { children: React.ReactNode }) {
	return <div className='flex justify-between'>{children}</div>;
}

// Header 내부에 Left, Right 추가
Header.Left = function Left({
	title,
	place,
	children,
}: {
	title: string;
	place: string;
	children?: React.ReactNode;
}) {
	return (
		<div className='flex flex-col gap-1'>
			<div className='flex items-center gap-2'>
				<div className='font-semibold text-sm md:text-base'>{title}</div>
				<div className='text-sm'>{place}</div>
			</div>
			<div className='flex gap-2'>{children}</div>
		</div>
	);
};

Header.Right = function Right({ children }: { children?: React.ReactNode }) {
	return (
		<div className='w-[48px] h-[48px] relative cursor-pointer'>{children}</div>
	);
};

// 카드 하단 정보(진행 상태)
function Footer({
	children,
}: {
	max: number;
	value: number;
	children: React.ReactNode;
}) {
	return (
		<div className={'flex justify-between gap-10 items-center mt-5'}>
			{/* 왼쪽 레이아웃 */}
			<div className='flex flex-col flex-1 gap-2'>{children}</div>

			{/* 오른쪽 버튼 */}
			<div
				className={`flex gap-2 cursor-pointer text-primary-600 font-semibold`}
			>
				<p>join now</p>
				<motion.p
					className=''
					animate={{ x: [0, 4, 0] }} // X축으로 3px 이동 후 원위치
					transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
				>
					→
				</motion.p>
			</div>
		</div>
	);
}

// 컴파운드 패턴 적용
Card.ImageContainer = ImageContainer;
Card.ImageSection = ImageSection; // 새로운 이름으로 할당
Card.Content = Content;
Card.Header = Header;
Card.Footer = Footer;
