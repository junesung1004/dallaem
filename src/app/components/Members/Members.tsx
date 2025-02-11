interface MembersProps {
	max: number;
	value: number;
}

function Members({ max, value }: MembersProps) {
	const fillColor =
		Math.floor(max) == Math.floor(value) ? 'fill-orange-400' : 'fill-gray-700';
	return (
		<div className='flex items-center'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='16'
				height='16'
				viewBox='0 0 16 16'
				fill='none'
				className={fillColor}
			>
				<circle cx='7.99967' cy='5.33335' r='2.66667' fill='current' />
				<path
					d='M3.55826 11.5471C3.99899 9.68459 5.84749 8.66669 7.76139 8.66669H8.23796C10.1519 8.66669 12.0004 9.68459 12.4411 11.5471C12.5264 11.9074 12.5941 12.2846 12.6323 12.6678C12.6687 13.0342 12.3679 13.3334 11.9997 13.3334H3.99967C3.63148 13.3334 3.33062 13.0342 3.36708 12.6678C3.40521 12.2846 3.47299 11.9074 3.55826 11.5471Z'
					fill='current'
				/>
			</svg>
			<span
				className={`${max === value ? 'text-orange-400' : 'text-gray-700'} font-medium`}
			>
				{value}/{max}
			</span>
		</div>
	);
}

export default Members;
