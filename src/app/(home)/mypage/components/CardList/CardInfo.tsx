import Members from '@/components/Members/Members';

export interface MeetingCardInfoProps {
	id?: number;
	title: string;
	location: string;
	meetingDate: string;
	meetingTime: string;
	curCount: number;
	fullCount: number;
}

function MeetingCardInfo({
	title,
	location,
	meetingDate,
	meetingTime,
	curCount,
	fullCount,
}: MeetingCardInfoProps) {
	return (
		<div className='flex flex-col gap-1'>
			<div className='flex items-center'>
				<h2 className='text-lg font-semibold'>{title}</h2>
				<span className='relative before:w-[2.5px] before:h-full before:absolute before:left-0 before:top-0 before:bg-gray-900 text-sm font-medium ml-4 pl-4 h-4 inline-flex items-center'>
					{location}
				</span>
			</div>
			<div className='flex gap-2 items-center text-sm font-medium'>
				<div className='text-gray-700 flex gap-1'>
					<span>{meetingDate}</span>&middot;
					<span>{meetingTime}</span>
				</div>
				<Members max={fullCount} value={curCount} highLight='off' />
			</div>
		</div>
	);
}

export default MeetingCardInfo;
