import Image from 'next/image';
import HeartRatings from '../HeartRatings/HeartRatings';
import ProfileIcon from '@/app/(home)/mypage/components/ProfileIcon/ProfileIcon';
import { useState } from 'react';

export default function ReviewCard({
	children,
	isDetailPage = false,
}: {
	children: React.ReactNode;
	isDetailPage?: boolean;
}) {
	return (
		<div className='mb-8 items-center'>
			<div className='flex flex-col flex-wrap md:flex-row w-full md:w-full h-full relative'>
				{children}
				{isDetailPage === false && (
					<div className='flex absolute -bottom-4 mb-3 sm:mb-0 w-full border-t-2 border-5 border-dashed border-gray-200'></div>
				)}
			</div>
		</div>
	);
}

function ImageSection({ src }: { src?: string }) {
	return (
		<div className='relative w-full sm:w-[280px] h-[156px] md:mb-3 md:mr-5 rounded-[24px] overflow-hidden'>
			{src && src.trim() ? (
				<Image
					src={src}
					alt='리뷰 이미지'
					fill
					priority
					className='object-cover'
				/>
			) : (
				<Image
					src='/images/imgLogin_pink_version.png'
					alt='기본 리뷰 이미지'
					fill
					className='object-cover'
				/>
			)}
		</div>
	);
}

function ReviewLayout({
	children,
	isDetailPage = false,
}: {
	children: React.ReactNode;
	isDetailPage?: boolean;
}) {
	return (
		<div
			className={`flex-1 relative text-gray-700 font-medium ${
				isDetailPage ? 'min-h-[100px]' : 'min-h-[156px]'
			}`}
		>
			{children}
			{isDetailPage && (
				<div className='flex absolute -bottom-4 w-full border-t-2 border-5 border-dashed border-gray-200'></div>
			)}
		</div>
	);
}

function HeartScore({ score }: { score: number }) {
	return (
		<div className='mb-3 mt-5 md:mt-1'>
			<HeartRatings rating={score} maxHearts={5} />
		</div>
	);
}

function Content({ comment }: { comment: string }) {
	const [expanded, setExpanded] = useState(false);
	const MAX_LENGTH = 300;

	const shouldTruncate = comment.length > MAX_LENGTH;
	const displayedText =
		expanded || !shouldTruncate ? comment : comment.slice(0, MAX_LENGTH);

	return (
		<div className='text-md mb-3'>
			<p>
				{displayedText}
				{shouldTruncate && !expanded && (
					<span
						onClick={() => setExpanded(true)}
						className='text-gray-500 font-normal hover:text-gray-900 cursor-pointer'
					>
						...더보기
					</span>
				)}
			</p>
			{expanded && (
				<button
					onClick={() => setExpanded(false)}
					className='text-gray-500 font-normal hover:text-gray-900'
				>
					접기
				</button>
			)}
		</div>
	);
}

function EtcInfo({
	type,
	location,
	userIcon,
	nickname,
	date,
}: {
	type?: string;
	location?: string;
	userIcon?: string;
	nickname?: string;
	date: string;
}) {
	const formatDate = (date: Date | string): string => {
		return new Date(date).toISOString().split('T')[0].replace(/-/g, '.');
	};

	const formatType = (type: string) => {
		if (type === 'MINDFULNESS') {
			return '심리지원 상담 프로그램';
		} else if (type === 'OFFICE_STRETCHING') {
			return '심리지원 마음의 캔버스';
		} else if (type === 'WORKATION') {
			return '마음쉼터';
		}
	};

	return (
		<div className='flex flex-col text-xs'>
			{type && location && (
				<div className='mb-2'>
					<span>{formatType(type)} 이용</span>
					<span className='mx-1'>·</span>
					<span>{location}</span>
				</div>
			)}
			<div className='flex flex-wrap items-center content-between w-fit whitespace-nowrap'>
				<>
					{userIcon && userIcon.trim() ? (
						<Image
							src={userIcon}
							alt='유저 이미지'
							width={24}
							height={24}
							className='mr-2 rounded-full w-[24px] h-[24px]'
						/>
					) : (
						<ProfileIcon.Avatar className='mr-2 w-[24px] h-[24px]' />
					)}
					<span>{nickname}</span>
					<span className='mx-2'>|</span>
				</>
				<span className='text-gray-500'>{formatDate(date)}</span>
			</div>
		</div>
	);
}

ReviewCard.ImageSection = ImageSection;
ReviewCard.ReviewLayout = ReviewLayout;
ReviewCard.Content = Content;
ReviewCard.HeartScore = HeartScore;
ReviewCard.EtcInfo = EtcInfo;
