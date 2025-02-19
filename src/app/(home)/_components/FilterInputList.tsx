'use client';

import React, { useState } from 'react';
import FilterInput from './FilterInput';

export default function FilterInputList() {
	const [selectedLocation, setSelectedLocation] = useState('지역 전체');
	console.log('selectedLocation : ', selectedLocation);

	const clickChangeLocationHandler = (
		e: React.ChangeEvent<HTMLSelectElement>,
	) => {
		setSelectedLocation(e.target.value);
	};

	return (
		<div className='flex justify-between'>
			{/* 왼쪽 필터 */}
			<div>
				{/* 장소 */}
				<FilterInput
					onChange={(e) => clickChangeLocationHandler(e)}
					value={selectedLocation}
				>
					<FilterInput.Option value='지역 전체' disabled={true}>
						날짜 선택
					</FilterInput.Option>
					<FilterInput.Option value='건대입구'>건대입구</FilterInput.Option>
					<FilterInput.Option value='을지로 3가'>을지로 3가</FilterInput.Option>
					<FilterInput.Option value='신림'>신림</FilterInput.Option>
					<FilterInput.Option value='홍대입구'>홍대입구</FilterInput.Option>
				</FilterInput>

				{/* 날짜 */}
				<FilterInput
					onChange={(e) => clickChangeLocationHandler(e)}
					value={selectedLocation}
				>
					<FilterInput.Option value='지역 전체' disabled={true}>
						날짜 선택
					</FilterInput.Option>
					{/* <CalenderImage startDate={} onApply={} setStartDate={} /> */}
				</FilterInput>
			</div>

			{/* 오른쪽 필터 */}
			<div>
				{/* 마감순 */}
				<FilterInput
					onChange={(e) => clickChangeLocationHandler(e)}
					value={selectedLocation}
				>
					<FilterInput.Option value='지역 전체' disabled={true}>
						↑↓ 최신순
					</FilterInput.Option>
					<FilterInput.Option value='건대입구'>건대입구</FilterInput.Option>
					<FilterInput.Option value='을지로 3가'>을지로 3가</FilterInput.Option>
					<FilterInput.Option value='신림'>신림</FilterInput.Option>
					<FilterInput.Option value='홍대입구'>홍대입구</FilterInput.Option>
				</FilterInput>
			</div>
		</div>
	);
}
