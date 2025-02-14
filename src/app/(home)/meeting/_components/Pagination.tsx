'use client';
import React, { useState } from 'react';
import { DummyDataType } from '@/types/paginationType';
import Image from 'next/image';

interface PaginationProps {
	data: DummyDataType[];
}

export function Pagination({ data }: PaginationProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(data.length / 4);

	const startIndex = (currentPage - 1) * 4;
	const endIndex = startIndex + 4;
	const currentData = data.slice(startIndex, endIndex);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<div>
			<ul>
				{currentData.map((item) => (
					<li key={item.id}>
						<div>{item.name}</div>
						<div>{item.location}</div>
						<hr />
					</li>
				))}
			</ul>

			{totalPages > 1 && (
				<div className='mt-5 flex items-center justify-center gap-3'>
					{/* 이전 버튼 */}
					<button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
					>
						<div className='flex items-center'>
							<Image
								src={'/icons/arrow/arrow.svg'}
								alt={'Left Arrow'}
								width={13}
								height={13}
							/>
							{currentPage > 1 && (
								<Image
									src={'/icons/arrow/blackArrow.svg'}
									alt={'Left Arrow'}
									width={33}
									height={33}
									className='rotate-180'
								/>
							)}
						</div>
					</button>

					{Array.from({ length: totalPages }, (_, index) => index + 1).map(
						(page) => (
							<button
								key={page}
								onClick={() => handlePageChange(page)}
								disabled={page === currentPage}
							>
								{page}
							</button>
						),
					)}

					{/* 다음 버튼 */}
					<button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
					>
						<div className='flex items-center'>
							{currentPage < totalPages && (
								<Image
									src={'/icons/arrow/blackArrow.svg'}
									alt={'Right Arrow'}
									width={33}
									height={33}
								/>
							)}
							<Image
								src={'/icons/arrow/arrow.svg'}
								alt={'Right Arrow'}
								width={13}
								height={13}
								className='rotate-180'
							/>
						</div>
					</button>
				</div>
			)}
		</div>
	);
}
