import Image from 'next/image';
import React from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import { StatusBadge } from '../StatusBadge';
import Members from '../Members/Members';
import { Tag } from '@/app/_tests/Tag';

export default function Card({
	children,
	isClear = true,
}: {
	children: React.ReactNode;
	isClear: boolean;
}) {
	return (
		<section
			className={`flex flex-col sm:flex-row h-[316px] sm:h-[156px] w-full xs:w-[343px] sm:w-full xl:w-[996px] border-2 rounded-[24px] mt-6 relative overflow-hidden
				`}
		>
			{children}
			{isClear && (
				<div className='absolute bg-black bg-opacity-80 inset-0 flex items-center justify-center text-white'>
					<div className='text-center'>
						<p>마감된 챌린지예요,</p>
						<p>다음 기회에 만나요 🙏</p>
						{/* 작은 화면에서는 작은 아이콘, 큰 화면에서는 큰 아이콘 */}
						<div
							onClick={() => {
								// console.log('클릭');
							}}
							className='cursor-pointer'
						>
							<Image
								src='/icons/discard/discardText.png'
								alt='모임 마감 아이콘 (작은 화면)'
								width={116}
								height={36}
								className='absolute bottom-16 right-28 sm:hidden'
							/>
						</div>
						<div
							onClick={() => {
								// console.log('클릭');
							}}
							className='cursor-pointer'
						>
							<Image
								src='/icons/discard/discardImg.png'
								alt='모임 마감 아이콘 (큰 화면)'
								width={36}
								height={36}
								className='absolute top-4 right-7 hidden sm:block'
							/>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}

//이미지 섹션
function ImageSection({ src, alt }: { src: string; alt: string }) {
	return (
		// 이미지
		<div
			className={`w-[343px] sm:w-[280px] h-full relative bg-white sm:border-r-2`}
		>
			<Image
				alt={alt}
				src={src}
				fill
				priority
				className='h-full w-full object-cover'
				sizes='(max-width: 640px) 343px, (max-width: 1024px) 280px, 100vw'
			/>
			<Tag text={'오늘 21시 마감'} isPosition />
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
				<div className='font-semibold'>{title}</div>
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
	max,
	value,
	onClick,
}: {
	max: number;
	value: number;
	onClick: () => void;
}) {
	return (
		<div className={'flex justify-between gap-10 items-center mt-5'}>
			{/* 왼쪽 레이아웃 */}
			<div className='flex flex-col flex-1 gap-2'>
				<div className='flex gap-2'>
					<Members max={20} value={14} />
					<StatusBadge />
				</div>

				<ProgressBar
					max={max}
					value={value}
					isNeutral={false}
					isAnimate={false}
				/>
			</div>

			{/* 오른쪽 버튼 */}
			<div
				onClick={onClick}
				className={`flex gap-2 cursor-pointer text-orange-600 font-semibold`}
			>
				<p>join now</p>
				<p>→</p>
			</div>
		</div>
	);
}

// 컴파운드 패턴 적용
Card.ImageSection = ImageSection;
Card.Content = Content;
Card.Header = Header;
Card.Footer = Footer;
