import Image from 'next/image';
import React from 'react';

export default function Card() {
	return (
		<section className="flex flex-col sm:flex-row h-[316px] sm:h-[156px] w-full xs:w-[343px] sm:w-full xl:w-[996px]  border-2 rounded-[24px] mt-6 ">
			{/* 이미지. */}
			<div className="w-[343px] sm:w-[280px] h-full relative sm:border-r-2">
				<Image
					alt="이미지 예시"
					src="/globe.svg"
					fill
					className="h-full w-full object-contain"
				/>
			</div>

			{/* 인포 */}
			<div className="flex-1 ">
				{/* top layout */}
				<div className="flex justify-between ">
					{/* left info */}
					<div className="flex flex-col gap-2">
						<div>달램핏 오피스 스트레칭 | 어쩌고 샬라샬라</div>
						<div className="flex gap-5">
							<div>1월 7일</div>
							<div>2시 30분</div>
						</div>
					</div>
					{/* 찜하기 아이콘 */}
					<div className="w-[48px] h-[48px] relative cursor-pointer">
						<Image alt="찜하기 아이콘" src={'/images/save.png'} fill />
					</div>
				</div>

				{/* bottom layout */}
				<div className="flex justify-between items-center mt-5">
					{/* left layout */}
					<div className="flex flex-col flex-1">
						<div className="flex gap-2">
							<p>18/20</p>
							<p>개설확정</p>
						</div>
						<input className="w-11/12" type="range" />
					</div>

					{/* right layout */}
					<div>
						<p>join now</p>
					</div>
				</div>
			</div>
		</section>
	);
}
