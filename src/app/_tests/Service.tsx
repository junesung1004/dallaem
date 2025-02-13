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
	onSelect: (service: OnselectProps) => void;
}) {
	const [selected, setSelected] = useState<string | null>('office');
	// console.log('selected : ', selected);

	const services = [
		{ id: 'office', name: '달랭핏', description: '오피스 스트레칭' },
		{ id: 'mindfulness', name: '달랭핏', description: '마인드풀니스' },
		{ id: 'workation', name: '워크에이션', description: '리프레쉬' },
	];

	const handleServiceSelect = (service: OnselectProps) => {
		setSelected(service.id);
		onSelect(service);
	};

	return (
		<div>
			<label className='font-semibold' htmlFor='service'>
				선택 서비스
			</label>
			<div className='flex gap-2 mt-3'>
				{services.map((item) => (
					<label
						key={item.id}
						className={`flex flex-col justify-center w-[119px] h-[76px] rounded-xl cursor-pointer transition
							${selected === item.id ? 'bg-slate-700 text-white' : 'bg-white text-black border'}`}
					>
						<div className='flex gap-2 items-center ml-2'>
							{/* 기본 라디오 숨기기 */}
							<input
								type='radio'
								name='service'
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
							<h2>{item.name}</h2>
						</div>
						<p className='ml-5 text-xs font-medium'>{item.description}</p>
					</label>
				))}
			</div>
		</div>
	);
}
