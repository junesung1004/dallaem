'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FITERING_DATA } from '@/constants';
import Image from 'next/image';

interface FilterDropdownProps {
	category: keyof typeof FITERING_DATA;
	selected?: string;
	sortOrder?: 'asc' | 'desc';
	onSelect: (value: string, order: 'asc' | 'desc') => void;
	variant?: 'default' | 'sort';
	calendarComponent?: React.ReactNode;
	isOpen: boolean;
	onToggle: () => void;
}

function FilterDropdown({
	category,
	selected,
	sortOrder = 'asc',
	onSelect,
	variant = 'default',
	calendarComponent,
	isOpen,
	onToggle,
}: FilterDropdownProps) {
	const data = FITERING_DATA[category] || [];
	const dropdownRef = useRef<HTMLDivElement>(null);

	const [internalSelected, setInternalSelected] = useState(
		data?.find((item) => item.value === selected)?.label ||
			(data[0]?.label ?? ''),
	);

	const isValidDate = (date: string | Date) => {
		return date instanceof Date && !isNaN(date.getTime());
	};

	const formattedDate =
		selected && isValidDate(new Date(selected))
			? `${new Date(selected).getFullYear().toString().slice(-2)}/${String(new Date(selected).getMonth() + 1).padStart(2, '0')}/${String(new Date(selected).getDate()).padStart(2, '0')}`
			: '';

	useEffect(() => {
		const selectedLabel =
			data?.find((item) => item.value === selected)?.label ||
			(data[0]?.label ?? '');
		setInternalSelected(selectedLabel);
	}, [selected, data]);

	// 외부 클릭 시 드롭다운 닫기
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				onToggle();
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onToggle]);

	const isSort = variant === 'sort';

	const toggleSortOrder = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (isSort && selected) {
			const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
			onSelect(selected, newOrder);
		}
	};

	const buttonBgColor = isSort
		? 'bg-white text-gray-800'
		: selected && selected.trim() !== ''
			? 'bg-black text-white'
			: 'bg-white text-gray-800';

	return (
		<div className='relative items-center' ref={dropdownRef}>
			<button
				className={`content-between h-[36px] md:h-[40px] px-2 border-2 border-gray-100 rounded-[12px] flex items-center whitespace-nowrap text-xs sm:text-sm font-medium focus:outline-none ${buttonBgColor} ${
					isSort ? 'max-w-[120px]' : 'max-w-[120px] md:w-[110px]'
				}`}
				onClick={onToggle}
			>
				{!isSort && (
					<div className='w-full flex justify-between items-center'>
						{formattedDate ? <>{formattedDate}</> : <>{internalSelected}</>}
						<Image
							src='icons/arrow/arrowDownDefault.svg'
							alt='open'
							width={24}
							height={24}
							className={`${selected ? 'filter invert' : ''}`}
						/>
					</div>
				)}
				{isSort && (
					<>
						<div
							className={`w-fit justify-between text-gray-500 cursor-pointer transform ${
								sortOrder === 'desc' ? 'scale-x-[-1]' : ''
							}`}
							onClick={(e) => {
								e.stopPropagation();
								if (window.innerWidth < 376) {
									onToggle();
								} else {
									toggleSortOrder(e);
								}
							}}
						>
							<Image
								src='/icons/sort/sortDefault.svg'
								alt={sortOrder}
								width={24}
								height={24}
								className='max-w-none'
							/>
						</div>
						<div
							className='ml-1 hidden sm:block cursor-pointer'
							onClick={(e) => {
								e.stopPropagation();
								onToggle();
							}}
						>
							{internalSelected}
						</div>
					</>
				)}
			</button>

			{/* 캘린더, 드롭다운 메뉴 */}
			{isOpen && (
				<div
					className={`w-[110px] absolute min-w-fit mt-1 p-1 bg-white rounded-lg shadow-lg text-sm font-medium z-10 ${
						isSort
							? 'right-0'
							: 'left-1/2 translate-x-[-50%] md:translate-x-0 md:left-auto'
					} ${calendarComponent ? 'border-[1px]' : ''}`}
				>
					{calendarComponent ? (
						<div className='w-fit'>
							{React.cloneElement(
								calendarComponent as React.ReactElement<{
									onApply: () => void;
								}>,
								{
									onApply: onToggle,
								},
							)}
						</div>
					) : (
						data?.map(({ label, value }) => (
							<div
								key={value}
								className={`px-1 py-2 text-gray-800 hover:bg-primary-100 hover:rounded-[12px] cursor-pointer transition-all whitespace-nowrap ${
									selected === value ? 'font-bold' : ''
								}`}
								onClick={() => {
									onSelect(value, sortOrder);
									onToggle();
								}}
							>
								{label}
							</div>
						))
					)}
				</div>
			)}
		</div>
	);
}

export default FilterDropdown;
