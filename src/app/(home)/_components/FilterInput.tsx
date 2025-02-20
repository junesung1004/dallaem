import React from 'react';

interface FilterOptionProps {
	value: string;
	children: React.ReactNode;
	disabled?: boolean;
}

interface FilterInputProps extends FilterOptionProps {
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function FilterInput({
	value,
	onChange,
	children,
}: FilterInputProps) {
	return (
		<select
			value={value}
			onChange={onChange}
			className='cursor-pointer p-2 border-2 border-gray-200 rounded-lg w-[110px]'
		>
			{children}
		</select>
	);
}

function Option({ children, value, disabled = false }: FilterOptionProps) {
	return (
		<option value={value} disabled={disabled}>
			{children}
		</option>
	);
}

FilterInput.Option = Option;
