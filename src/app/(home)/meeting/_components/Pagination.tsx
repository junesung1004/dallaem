'use client';

import React from 'react';
import Image from 'next/image';
import { PaginationReviewProps } from '@/types/paginationType';

export function Pagination({
	currentData,
	currentPage,
	totalPages,
	onPageChange,
}: PaginationReviewProps) {
	return (
		<div>
			<ul>
				{currentData.map((review) => (
					<li key={review.id} className='mb-4'>
						<div className='font-bold'>{review.comment}</div>
						<div className='text-sm text-gray-500'>
							{review.Gathering.location}
						</div>
						<hr className='mt-2' />
					</li>
				))}
			</ul>

			{totalPages > 1 && (
				<div className='mt-5 flex items-center justify-center gap-3'>
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
			)}
		</div>
	);
}
