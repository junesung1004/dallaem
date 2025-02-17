import { MeetingCard } from '@/app/(home)/meeting/_components/MeetingCard';
import { DeadlineBadge } from '@/components/Badge/DeadlineBadge';
import { Footer } from '../_components/footer';
import { Pagination } from '../_components/Pagination';
import Image from 'next/image';
import { DummyDataType } from '@/types/paginationType';

const DummyData: DummyDataType[] = [
	{
		teamId: '71',
		id: 12,
		type: 'OFFICE_STRETCHING',
		name: '1',
		dateTime: '2025-02-17T04:48:55.087Z',
		registrationEnd: '2025-02-14T04:48:55.087Z',
		location: '건대입구',
		participantCount: 0,
		capacity: 10,
		image:
			'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1738904240393_EVERYTHING.jpg',
		createdBy: 9310151325,
		canceledAt: null,
	},
	{
		teamId: '72',
		id: 11,
		type: 'OFFICE_STRETCHING',
		name: '2',
		dateTime: '2025-02-17T04:48:55.087Z',
		registrationEnd: '2025-02-14T04:48:55.087Z',
		location: '건대입구',
		participantCount: 0,
		capacity: 10,
		image:
			'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1738904240393_EVERYTHING.jpg',
		createdBy: 9310151325,
		canceledAt: null,
	},
	{
		teamId: '73',
		id: 10,
		type: 'OFFICE_STRETCHING',
		name: '3',
		dateTime: '2025-02-17T04:48:55.087Z',
		registrationEnd: '2025-02-14T04:48:55.087Z',
		location: '건대입구',
		participantCount: 0,
		capacity: 10,
		image:
			'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1738904240393_EVERYTHING.jpg',
		createdBy: 9310151325,
		canceledAt: null,
	},
	{
		teamId: '74',
		id: 9,
		type: 'OFFICE_STRETCHING',
		name: '4',
		dateTime: '2025-02-17T04:48:55.087Z',
		registrationEnd: '2025-02-14T04:48:55.087Z',
		location: '건대입구',
		participantCount: 0,
		capacity: 10,
		image:
			'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1738904240393_EVERYTHING.jpg',
		createdBy: 9310151325,
		canceledAt: null,
	},
	{
		teamId: '57',
		id: 8,
		type: 'OFFICE_STRETCHING',
		name: '5',
		dateTime: '2025-02-17T04:48:55.087Z',
		registrationEnd: '2025-02-14T04:48:55.087Z',
		location: '건대입구',
		participantCount: 0,
		capacity: 10,
		image:
			'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1738904240393_EVERYTHING.jpg',
		createdBy: 9310151325,
		canceledAt: null,
	},
	{
		teamId: '57',
		id: 7,
		type: 'OFFICE_STRETCHING',
		name: '6',
		dateTime: '2025-02-17T04:48:55.087Z',
		registrationEnd: '2025-02-14T04:48:55.087Z',
		location: '건대입구',
		participantCount: 0,
		capacity: 10,
		image:
			'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1738904240393_EVERYTHING.jpg',
		createdBy: 9310151325,
		canceledAt: null,
	},
	{
		teamId: '57',
		id: 6,
		type: 'OFFICE_STRETCHING',
		name: '7',
		dateTime: '2025-02-17T04:48:55.087Z',
		registrationEnd: '2025-02-14T04:48:55.087Z',
		location: '건대입구',
		participantCount: 0,
		capacity: 10,
		image:
			'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1738904240393_EVERYTHING.jpg',
		createdBy: 9310151325,
		canceledAt: null,
	},
];

export default function DetailPage() {
	return (
		<div className='px-28 py-12 min-h-screen'>
			<div className='flex flex-wrap gap-7 justify-center w-full'>
				<div className='flex-1 w-full min-w-[300px] h-72'>
					<div className='overflow-hidden border-[2px] border-gray-200 shadow-md rounded-3xl '>
						<div className='relative'>
							<DeadlineBadge registrationEnd='2025-02-13T04:48:55.087Z' />
							<Image
								src='/images/imgLogin.png'
								alt='더미 이미지'
								width={400}
								height={300}
								className='w-full min-w-[300px] h-72'
							/>
						</div>
					</div>
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
			<div>
				<Pagination data={DummyData} />
			</div>
			<div className='fixed bottom-0 left-0 w-full '>
				<Footer createdBy={DummyData[0].createdBy} />
			</div>
		</div>
	);
}
