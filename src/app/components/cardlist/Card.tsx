import Image from 'next/image';
import React from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';

export default function Card({ children }: { children: React.ReactNode }) {
	return (
		<section className="flex flex-col sm:flex-row h-[316px] sm:h-[156px] w-full xs:w-[343px] sm:w-full xl:w-[996px] border-2 rounded-[24px] mt-6 ">
			{children}
		</section>
	);
}

//이미지 섹션
function ImageSection({ src, alt }: { src: string; alt: string }) {
	return (
		// 이미지
		<div className="w-[343px] sm:w-[280px] h-full relative sm:border-r-2">
			<Image
				alt={alt}
				src={src}
				fill
				className="h-full w-full object-contain"
			/>
		</div>
	);
}

// 카드 내부 컨텐츠 섹션
function Content({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex-1 p-4">
			{/* top && bottom layout  */}
			{children}
		</div>
	);
}

//카드 상단 정보
function Header({
	title,
	place,
	date,
	time,
	src,
	onClick,
}: {
	title: string;
	place: string;
	date: string;
	time: string;
	src: string;
	onClick: () => void;
}) {
	return (
		<div className="flex justify-between">
			{/* 왼쪽 정보 */}
			<div className="flex flex-col gap-1">
				<div className="flex items-center gap-2">
					<div className="font-semibold">{title}</div>
					<div className="text-sm">{place}</div>
				</div>

				<div className="flex gap-5">
					<div>{date}</div>
					<div>{time}</div>
				</div>
			</div>

			{/* 오른쪽 찜하기 버튼 */}
			<div
				className="w-[48px] h-[48px] relative cursor-pointer"
				onClick={onClick}
			>
				<Image alt="찜하기 아이콘" src={src} fill />
			</div>
		</div>
	);
}

// 카드 하단 정보(진행 상태)
function Footer({
	max,
	value,
	status,
	onClick,
}: {
	max: number;
	value: number;
	status: string;
	onClick: () => void;
}) {
	return (
		<div className="flex justify-between gap-10 items-center mt-5">
			{/* 왼쪽 레이아웃 */}
			<div className="flex flex-col flex-1 gap-2">
				<div className="flex gap-2">
					<p>
						{value}/{max}
					</p>
					<p>{status}</p>
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
				className="flex gap-2 cursor-pointer text-orange-600 font-semibold"
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

// export default function Card() {
// 	return (
// 		<section className="flex flex-col sm:flex-row h-[316px] sm:h-[156px] w-full xs:w-[343px] sm:w-full xl:w-[996px] border-2 rounded-[24px] mt-6 ">
// 			{/* 이미지 */}
// 			<div className="w-[343px] sm:w-[280px] h-full relative sm:border-r-2">
// 				<Image
// 					alt="이미지 예시"
// 					src="/images/imgLogin.png"
// 					fill
// 					className="h-full w-full object-contain"
// 				/>
// 			</div>

// 			{/* 인포 */}
// 			<div className="flex-1 p-4">
// 				{/* top layout */}
// 				<div className="flex justify-between ">
// 					{/* left info */}
// 					<div className="flex flex-col gap-1">
// 						<div>달램핏 오피스 스트레칭 | 어쩌고</div>
// 						<div className="flex gap-5">
// 							<div>1월 7일</div>
// 							<div>2시 30분</div>
// 						</div>
// 					</div>
// 					{/* right info 찜하기 아이콘 */}
// 					<div className="w-[48px] h-[48px] relative cursor-pointer">
// 						<Image alt="찜하기 아이콘" src={'/images/save.png'} fill />
// 					</div>
// 				</div>

// 				{/* bottom layout */}
// 				<div className="flex justify-between gap-10 items-center mt-5">
// 					{/* left layout */}
// 					<div className="flex flex-col flex-1 gap-2">
// 						<div className="flex gap-2">
// 							<p>18/20</p>
// 							<p>개설확정</p>
// 						</div>
// 						<ProgressBar
// 							max={40}
// 							value={30}
// 							isNeutral={false}
// 							isAnimate={false}
// 						/>
// 					</div>

// 					{/* right layout */}
// 					<div className="flex gap-2 cursor-pointer text-orange-600 font-semibold">
// 						<p>join now</p>
// 						<p>→</p>
// 					</div>
// 				</div>
// 			</div>
// 		</section>
// 	);
// }
