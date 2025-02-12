import Image from 'next/image';

export const Tag = ({
	text,
	isPosition = true,
}: {
	text: string;
	isPosition?: boolean;
}) => {
	return (
		<div
			className={
				isPosition
					? `inline-block absolute text-sm text-white bg-orange-600 top-0 right-0 px-3 py-1 rounded-bl-2xl`
					: `inline-block text-sm text-white  bg-orange-600 px-3 py-1 rounded-bl-2xl`
			}
		>
			<div className='flex gap-1'>
				<div className='relative w-[24px] h-[24px]'>
					<Image src={'/icons/alarm.png'} alt='시계 아이콘' fill />
				</div>
				<div>{text}</div>
			</div>
		</div>
	);
};
