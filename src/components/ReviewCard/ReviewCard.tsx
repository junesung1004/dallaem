import Image from 'next/image';
import HeartRatings from '../HeartRatings/HeartRatings';

export default function ReviewCard({
	children,
	isDetailPage = false,
}: {
	children: React.ReactNode;
	isDetailPage?: boolean;
}) {
	return (
		<div className='mb-8'>
			<div className='flex flex-col sm:flex-row w-[311px] sm:w-full h-full relative'>
				{children}
				{isDetailPage === false && (
					<div className='flex absolute -bottom-4 w-full border-t border-5 border-dashed border-gray-200'></div>
				)}
			</div>
		</div>
	);
}

function ImageSection({ src }: { src?: string }) {
	return (
		<>
			{src && (
				<div className='relative bg-primary-300 w-[311px] sm:w-[280px] h-[156px] sm:mb-3 sm:mr-5 rounded-[24px] overflow-hidden'>
					<Image
						src={src}
						alt='리뷰 이미지'
						fill
						priority
						className='object-cover'
						sizes='(max-width: 640px) 343px, (max-width: 1024px) 280px, 100vw'
					/>
				</div>
			)}
		</>
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
			className={`flex-1 relative h-full text-gray-700 font-medium ${
				isDetailPage ? 'min-h-[100px]' : 'min-h-[156px]'
			}`}
		>
			{children}
			{isDetailPage && (
				<div className='flex absolute bottom-0 w-full border-t border-dashed border-gray-200'></div>
			)}
		</div>
	);
}

function HeartScore({ score }: { score: number }) {
	return (
		<div className='mb-3 mt-5 sm:mt-1'>
			<HeartRatings rating={score} maxHearts={5} />
		</div>
	);
}

function Content({ comment }: { comment: string }) {
	return <div className='text-sm mb-3'>{comment}</div>;
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
			return '달램핏 마인드풀니스';
		} else if (type === 'OFFICE_STRETCHING') {
			return '달램핏 오피스 스트레칭';
		} else if (type === 'WORKATION') {
			return '워케이션';
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
				{nickname && userIcon && (
					<>
						<Image
							src={userIcon}
							alt='유저 이미지'
							width={24}
							height={24}
							className='mr-2 rounded-full w-[24px] h-[24px]'
						/>
						<span>{nickname}</span>
						<span className='mx-2'>|</span>
					</>
				)}
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
