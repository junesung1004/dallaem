'use client';

import React from 'react';
import PageInfo from '@/components/PageInfo/PageInfo';
import PageNavbar from '@/components/PageNav/PageNavbarCustom';
import HomeButton from './_components/HomeButton';
import CardListInfinite from '@/components/MainCard/CardListInfinite';
import FilterProvider from '@/context/FilterContent';
import FilterList from '@/components/Filtering/FIlterListCustom';
import { FilterType } from '@/types/filterType';
import { useFilters } from '@/hooks/customs/useFilters';

export default function MainPage({
	initialFilters,
}: {
	initialFilters: FilterType;
}) {
	const { currentFilter, handleChangeFilter, handleTypeHandler } =
		useFilters(initialFilters);

	return (
		<div className='flex flex-col gap-5'>
			{/* 함께 할 사람이 없나요? */}
			<PageInfo pageKey='meetings' />

			<FilterProvider defaultSortBy='dateTime'>
				{/* 필터 드롭다운 메뉴  */}
				<FilterList
					// 사용 가능한 필터 선택
					enabledFilters={['location', 'date', 'sortByMeeting']}
					handleFilter={handleChangeFilter}
					filter={currentFilter}
				/>

				{/* 달램핏 nav 및 filter 및 모임 만들기 */}
				<div className='flex relative mt-10 mb-5'>
					<PageNavbar
						pageKey='meetings'
						onMainClick={handleTypeHandler}
						onSubClick={handleTypeHandler}
						filter={currentFilter}
					/>
					<div className='absolute right-0'>
						<HomeButton />
					</div>
				</div>

				{/* 보더 콘테이너 */}
				<div className='border-b-2'></div>

				{/* 모임 목록 */}
				<CardListInfinite filters={currentFilter} />
			</FilterProvider>
		</div>
	);
}
