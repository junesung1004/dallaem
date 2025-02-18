import Input from './Input';

function FormControl({
	children,
	title,
	id,
}: {
	id?: string;
	children: React.ReactNode;
	title: string;
}) {
	return (
		<div className='flex flex-col gap-2'>
			<label htmlFor={id} className='text-base font-semibold inline-block'>
				{title}
			</label>
			{children}
		</div>
	);
}

interface InputControlProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	title: string;
}

function InputControl({
	id,
	name,
	title,
	disabled,
	value,
	onChange,
}: InputControlProps) {
	return (
		<FormControl id={id} title={title}>
			<div className='md:min-w-[471px] md:max-w-[471px] min-w-[308px] bg-gray-50 px-4 py-2 focus-within:outline focus-within:outline-2 focus-within:outline-orange-600 rounded-lg'>
				<Input
					id={id}
					name={name}
					disabled={disabled}
					value={value}
					onChange={onChange}
				/>
			</div>
		</FormControl>
	);
}

FormControl.InputControl = InputControl;

export default FormControl;
