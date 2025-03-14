import React from 'react';
import Image from 'next/image';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export function Pagination({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) {
	if (totalPages < 2) return null;

	return (
		<div className='mt-5 flex items-center justify-center gap-3'>
			{/* 이전 페이지 버튼 */}
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				{currentPage === 1 ? (
					<Image
						src={'/icons/arrow/arrow.svg'}
						alt={'Disabled Left Arrow'}
						width={13}
						height={13}
					/>
				) : (
					<Image
						src={'/icons/arrow/blackArrow.svg'}
						alt={'Active Left Arrow'}
						width={33}
						height={33}
						className='rotate-180'
					/>
				)}
			</button>

			{/* 페이지 번호들 */}
			{Array.from({ length: totalPages }, (_, index) => index + 1).map(
				(page) => (
					<button
						key={page}
						onClick={() => onPageChange(page)}
						disabled={page === currentPage}
						className={`px-3 py-1 text-lg font-medium ${
							page === currentPage ? 'text-black' : 'text-gray-400'
						}`}
					>
						{page}
					</button>
				),
			)}

			{/* 다음 페이지 버튼 */}
			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				{currentPage === totalPages ? (
					<Image
						src={'/icons/arrow/arrow.svg'}
						alt={'Disabled Right Arrow'}
						width={13}
						height={13}
						className='rotate-180'
					/>
				) : (
					<Image
						src={'/icons/arrow/blackArrow.svg'}
						alt={'Active Right Arrow'}
						width={33}
						height={33}
					/>
				)}
			</button>
		</div>
	);
}
