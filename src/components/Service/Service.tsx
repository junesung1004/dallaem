'use client';

import { useState } from 'react';

type OnselectProps = {
	id: string;
	name: string;
	description: string;
};

export default function ServiceSelector({
	onSelect,
}: {
	onSelect: (service: string) => void;
}) {
	const [selected, setSelected] = useState<string | null>('OFFICE_STRETCHING');
	// console.log('selected : ', selected);

	const services = [
		{ id: 'OFFICE_STRETCHING', name: '달램핏', description: '오피스 스트레칭' },
		{ id: 'MINDFULNESS', name: '달램핏', description: '마인드풀니스' },
		{ id: 'WORKATION', name: '워크에이션', description: '리프레쉬' },
	];

	const handleServiceSelect = (service: OnselectProps) => {
		setSelected(service.id);
		onSelect(service.id);
	};

	return (
		<div className='w-full'>
			<label className='font-semibold' htmlFor='service'>
				선택 서비스
			</label>
			<div className='flex gap-2 mt-3 w-full'>
				{services.map((item) => (
					<label
						key={item.id}
						className={`flex flex-col justify-center w-1/3 h-[76px] rounded-xl cursor-pointer transition
							${selected === item.id ? 'bg-slate-700 text-white' : 'bg-white text-black border'}`}
					>
						<div className='flex gap-2 items-center sm:ml-7 xs:ml-2'>
							{/* 기본 라디오 숨기기 */}
							<input
								type='radio'
								id={item.id}
								checked={selected === item.id}
								onChange={() => handleServiceSelect(item)}
								className='hidden'
							/>
							{/* 네모난 박스 스타일 */}
							<div
								className={`w-4 h-4 border-2 bg-white rounded-md flex items-center justify-center`}
							>
								{/* 체크 시 V 표시 */}
								{selected === item.id && (
									<span className='text-orange-500 font-bold'>✓</span>
								)}
							</div>
							<h2 className='font-semibold'>{item.name}</h2>
						</div>
						<p className='sm:ml-12 xs:ml-5 text-xs font-medium'>
							{item.description}
						</p>
					</label>
				))}
			</div>
		</div>
	);
}
