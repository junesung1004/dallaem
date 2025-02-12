import { MeetingCard } from '@/app/components/MeetingCard';
import Image from 'next/image';

const DummyData = [
	{
		teamId: '7',
		id: 1733,
		type: 'OFFICE_STRETCHING',
		name: 'test모임',
		dateTime: '2025-02-17T04:48:55.087Z',
		registrationEnd: '2025-02-14T04:48:55.087Z',
		location: '건대입구',
		participantCount: 0,
		capacity: 10,
		image:
			'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1738904240393_EVERYTHING.jpg',
		createdBy: 1115,
		canceledAt: null,
	},
];

export default function DetailPage() {
	return (
		<div className='px-28 py-12'>
			<div className='flex flex-wrap gap-7 justify-center w-full'>
				<div className='flex-1 '>
					<Image
						src='/images/imgLogin.png'
						alt='더미 이미지'
						width={400}
						height={300}
						className='border-[2px] border-gray-200 shadow-md rounded-3xl p-4 w-full min-w-[300px] h-72'
					/>
				</div>
				<div className='flex-1 min-w-[300px]'>
					<MeetingCard
						type={DummyData[0].type}
						location={DummyData[0].location}
						date={DummyData[0].registrationEnd}
						id={DummyData[0].id}
					/>
				</div>
			</div>
		</div>
	);
}
