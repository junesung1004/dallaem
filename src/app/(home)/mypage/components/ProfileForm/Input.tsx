function Input({
	onChange,
	value,
	...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input
			{...props}
			value={value}
			className={`bg-transparent resize-none w-full h-full outline-none`}
			onChange={onChange}
		/>
	);
}

export default Input;
