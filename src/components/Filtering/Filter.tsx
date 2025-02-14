'use client';

import { useState, useEffect } from 'react';
import { FITERING_DATA } from '@/constants';
import Image from 'next/image';

interface FilterDropdownProps {
	category: keyof typeof FITERING_DATA;
	selected?: string;
	sortOrder?: 'asc' | 'desc';
	onSelect: (value: string, order: 'asc' | 'desc') => void;
	variant?: 'default' | 'sort';
	calendarComponent?: React.ReactNode;
}

function Filter({
	category,
	selected,
	sortOrder = 'asc',
	onSelect,
	variant = 'default',
	calendarComponent,
}: FilterDropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const data = FITERING_DATA[category] || [];

	const [internalSelected, setInternalSelected] = useState(
		data?.find((item) => item.value === selected)?.label ||
			(data[0]?.label ?? ''),
	);

	//`selected` 값 변경될 때 `label` 업데이트
	useEffect(() => {
		const selectedLabel =
			data?.find((item) => item.value === selected)?.label ||
			(data[0]?.label ?? '');
		setInternalSelected(selectedLabel);
	}, [selected, data]);

	const isSortVariant = variant === 'sort';

	//sortBy 변경
	const handleSelect = (value: string) => {
		const selectedLabel =
			data?.find((item) => item.value === value)?.label || value;
		onSelect(value, sortOrder);
		setInternalSelected(selectedLabel);
		setIsOpen(false);
	};

	//정렬 순서 변경
	const toggleSortOrder = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (isSortVariant && selected) {
			const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
			onSelect(selected, newOrder);
		}
	};

	const buttonBgColor = isSortVariant
		? 'bg-white text-gray-800'
		: selected && selected.trim() !== ''
			? 'bg-black text-white'
			: 'bg-white text-gray-800';

	return (
		<div className='relative min-w-[40px] sm:min-w-[110px] items-center'>
			<button
				className={`w-full h-[36px] sm:h-[40px] px-3 py-2 border-2 border-gray-100 rounded-[12px] flex items-center ${
					isSortVariant ? 'justify-center' : 'justify-between'
				} text-sm font-medium focus:outline-none ${buttonBgColor}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				{!isSortVariant && (
					<div className='flex w-full justify-between'>
						{internalSelected}
						<Image
							src='icons/arrow/arrowDownDefault.svg'
							alt='open'
							width={24}
							height={24}
							className={`${selected ? 'filter invert' : ''}`}
						/>
					</div>
				)}
				{isSortVariant && (
					<>
						<div
							className={`text-gray-500 mr-1 cursor-pointer transform ${
								sortOrder === 'desc' ? 'scale-x-[-1]' : ''
							}`}
							onClick={toggleSortOrder}
						>
							<Image
								src='/icons/sort/sortDefault.svg'
								alt={sortOrder}
								width={24}
								height={24}
							/>
						</div>
						<div className='hidden sm:block'>{internalSelected}</div>
					</>
				)}
			</button>

			{/*캘린더, 드롭다운 메뉴*/}
			{isOpen && (
				<div className='w-[110px] sm:w-full absolute mt-1 p-1 bg-white rounded-lg shadow-lg text-sm font-medium z-10 overflow-hidden'>
					{calendarComponent ? (
						<div className='p-4'>{calendarComponent}</div>
					) : (
						data?.map(({ label, value }) => (
							<div
								key={value}
								className={`px-1 py-2 text-gray-800 hover:bg-orange-100 hover:rounded-[12px] cursor-pointer transition-all whitespace-nowrap ${
									selected === value ? 'font-bold' : ''
								}`}
								onClick={() => handleSelect(value)}
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

export default Filter;
