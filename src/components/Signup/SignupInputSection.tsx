import React, { useEffect, useState } from 'react';
import { InputWindow } from '../InputSection/InputWindow';
import { HideToggle } from '../Toggle/HideToggle';

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
		<div className='text-[14px] flex flex-col gap-[8px] '>
			<span>{title}</span>
			<div className='relative'>
				<InputWindow
					placeholderText={placeholderText}
					onChange={handleOnChange}
					onBlur={onBlur || undefined}
					onFocus={onFocus || undefined}
					value={value}
					type={curType || 'text'}
					isError={isError || undefined}
					className={'text-[14px] md:text-[16px]'}
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
			{errorMsg && <span>{errorMsg}</span>}
		</div>
	);
};
export { SignupInputSection };
