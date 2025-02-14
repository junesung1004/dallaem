import React, { useEffect, useState } from 'react';
import { InputWindow } from '../InputSection/InputWindow';
import { HideToggle } from '../InputSection/HideToggle';

interface SignupInputSectionInterface {
	id: string;
	title: string;
	placeholderText: string;
	value: string;
	type: string;
	errorMsg: string;
	isError?: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>, type: string) => void;
	onBlur?: () => void;
	onFocus?: () => void;
}

const SignupInputSection = ({
	id,
	title,
	placeholderText,
	value,
	type,
	onChange,
	onBlur,
	onFocus,
	errorMsg,
	isError,
}: SignupInputSectionInterface) => {
	const [curType, setCurType] = useState(type);
	const [isHidden, setIsHidden] = useState(type === 'password');

	const handleHideToggle = () => {
		setIsHidden((prev) => !prev);
	};
	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event, id);
	};

	useEffect(() => {
		if (isHidden === false) {
			setCurType('text');
		} else {
			setCurType('password');
		}
	}, [isHidden, type]);

	return (
		<div className='relative h-[10%] grid grid-rows-[3fr_6fr_1fr]'>
			<span className='text-sm md:text-lg'>{title}</span>
			<div className='relative'>
				<InputWindow
					placeholderText={placeholderText}
					onChange={handleOnChange}
					onBlur={onBlur || undefined}
					onFocus={onFocus || undefined}
					value={value}
					type={curType || 'text'}
					isError={isError || undefined}
				/>
				{type === 'password' && (
					<HideToggle
						onClick={handleHideToggle}
						isHidden={isHidden}
						className='absolute inset-y-4 lg:inset-y-15 right-2 lg:inset-y-5'
					/>
				)}
			</div>
			{/* 에러 메시지 */}
			{errorMsg && (
				<span className='text-xs lg:text-sm text-red-600'>{errorMsg}</span>
			)}
		</div>
	);
};
export { SignupInputSection };
