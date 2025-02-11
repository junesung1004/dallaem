'use client';
import React, { useEffect, useState } from 'react';

interface InputWindowProps {
	placeholderText: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	isError?: boolean;
	type?: string;
}
/*  
placeholderText: placeholder로 설정할 텍스트
onChange: 부모가 입력창 관리함
value: 부모로부터 받아온 입력 값
isError: 부모가 에러 트리거 가능하도록 함 (옵션)
type: input Type 받아옴. 기본값: text (옵션)
*/

const InputWindow = ({
	placeholderText,
	onChange,
	value,
	isError,
	type,
}: InputWindowProps) => {
	// 입력 상태 관리 hook
	const [typeStatus, setTypeStatus] = useState<'empty' | 'typing' | 'error'>(
		'empty',
	);

	// onChange 확장 함수 (typeStatus 값 추가)
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e);
		setTypeStatus('typing');
	};

	// 부모로부터 error 전달 받을 경우 error state 설정
	useEffect(() => {
		if (isError) {
			setTypeStatus('error');
		}
	}, [isError]);

	// 입력 상태에 따라 borderStyle 변경
	const borderStyle =
		typeStatus === 'error'
			? 'border border-2 border-red-600 rounded-xl '
			: typeStatus === 'typing'
				? 'border border-2 border-orange-600 rounded-xl '
				: null;

	//return
	return (
		<div className={`w-full aspect-[460/50] mx-auto m-3 `}>
			<input
				placeholder={placeholderText}
				onChange={handleChange}
				value={value}
				className={`w-full h-full outline-none text-base bg-gray-50 px-3 ${borderStyle}`}
				type={type || 'text'} //props에 type이 지정되어있으면 해당 type 쓰고 지정되지 않았으면 기본값 text 사용
			></input>
		</div>
	);
};

export { InputWindow };
