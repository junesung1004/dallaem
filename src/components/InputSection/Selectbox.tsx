interface SelectboxInterface {
	placeholderText: string;
	values: string[];
	id?: string;
	className?: string;
	onChange?: () => void;
}

const Selectbox = ({
	placeholderText,
	values,
	id,
	className,
	onChange,
}: SelectboxInterface) => {
	return (
		<div className={`w-full aspect-[460/50] mx-auto m-3 `}>
			<select
				name={placeholderText}
				id={id || undefined}
				className={`w-full h-full outline-none text-base bg-gray-50 px-3 rounded-xl ${className || ''}`}
				onChange={onChange}
			>
				<option disabled hidden selected>
					{placeholderText}
				</option>
				{values.map((value, index) => (
					<option key={index} value={value}>
						{value}
					</option>
				))}
			</select>
		</div>
	);
};

export { Selectbox };
