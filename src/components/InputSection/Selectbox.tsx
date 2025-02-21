import { ChangeEvent } from 'react';

interface SelectboxInterface {
	placeholderText: string;
	id?: string;
	className?: string;
	value: string; // Value prop to handle the selected option
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void; // onChange handler
}

const Selectbox = ({
	placeholderText,
	id,
	className,
	value, // Accept the value prop to manage selected option
	onChange,
}: SelectboxInterface) => {
	return (
		<div className={`w-full aspect-[460/50] mx-auto m-3`}>
			<select
				id={id || undefined}
				className={`w-full h-full outline-none text-base bg-gray-50 px-3 rounded-xl ${className || ''}`}
				value={value} // Bind the selected value to the value prop
				onChange={onChange} // Pass the change handler
			>
				<option value='' disabled hidden>
					{placeholderText}
				</option>
				<option value='건대입구'>건대입구</option>
				<option value='을지로3가'>을지로 3가</option>
				<option value='신림'>신림</option>
				<option value='홍대입구'>홍대입구</option>
			</select>
		</div>
	);
};

export { Selectbox };
