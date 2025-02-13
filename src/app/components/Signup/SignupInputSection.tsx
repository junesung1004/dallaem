import React from 'react';
import { InputWindow } from '../InputWindow';

interface SignupInputSectionInterface {
	title: string;
	placeholderText: string;
	value: string;
	type?: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: () => void;
	onFocus?: () => void;
	errorMsg: string;
	isError?: boolean;
}

const SignupInputSection = ({
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
	return (
		<div className='relative h-[10%] grid grid-rows-[3fr_6fr_1fr]'>
			<span className='text-sm md:text-lg'>{title}</span>
			<InputWindow
				placeholderText={placeholderText}
				onChange={onChange}
				onBlur={onBlur || undefined}
				onFocus={onFocus || undefined}
				value={value}
				type={type || 'text'}
				isError={isError || undefined}
			/>
			{/* 에러 메시지 */}
			{errorMsg && (
				<span className='text-xs lg:text-sm text-red-600'>{errorMsg}</span>
			)}
		</div>
	);
};
export { SignupInputSection };
