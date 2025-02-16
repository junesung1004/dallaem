import ProgressBar from '@/components/ProgressBar/ProgressBar';
import Badge from '@/components/Badge/Badge';
import HeartRatings from '@/components/HeartRatings/HeartRatings';
import Members from '@/components/Members/Members';
import Link from 'next/link';
import GlobalModal from './components/GlobalModal';
import Button from '@/components/Button/Button';
import ProfileHeader from './components/ProfileHeader/ProfileHeader';
import ProfileForm from './components/ProfileForm/ProfileForm';
import CardBase from './components/CardList/CardBase';
export interface IMeeting {
	teamId: number;
	id: number;
	type: string;
	name: string;
	dateTime: string;
	registrationEnd: string;
	location: string;
	participantCount: number;
	capacity: number;
	image: string;
	createdBy: number;
	canceledAt: string;
}

const mockMeetings: IMeeting[] = [
	{
		teamId: 1,
		id: 101,
		type: '회의',
		name: '팀 전략 회의',
		dateTime: '2025-02-02T10:00:00Z',
		registrationEnd: '2025-02-19T18:00:00Z',
		location: '서울 본사 2층 회의실',
		participantCount: 10,
		capacity: 10,
		image:
			'https://plus.unsplash.com/premium_photo-1681324259575-f6ad9653e2fd?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		createdBy: 501,
		canceledAt: '',
	},
	{
		teamId: 7,
		id: 102,
		type: '워크샵',
		name: '신제품 기획 워크샵',
		dateTime: '2025-02-12T14:00:00Z',
		registrationEnd: '2025-02-24T12:00:00Z',
		location: '부산 해운대 호텔',
		participantCount: 2,
		capacity: 20,
		image: 'workshop.jpg',
		createdBy: 502,
		canceledAt: '',
	},
	{
		teamId: 7,
		id: 103,
		type: '세미나',
		name: 'IT 최신 동향 세미나',
		dateTime: '2025-05-01T09:30:00Z',
		registrationEnd: '2025-02-28T17:00:00Z',
		location: '온라인 줌',
		participantCount: 50,
		capacity: 100,
		image: 'seminar.jpg',
		createdBy: 503,
		canceledAt: '',
	},
	{
		teamId: 7,
		id: 104,
		type: '네트워킹 이벤트',
		name: '비즈니스 네트워킹 이벤트',
		dateTime: '2025-02-15T19:35:34Z',
		registrationEnd: '2025-03-04T20:00:00Z',
		location: '대전 컨벤션 센터',
		participantCount: 1,
		capacity: 30,
		image: 'networking.jpg',
		createdBy: 504,
		canceledAt: '',
	},
	{
		teamId: 7,
		id: 105,
		type: '교육 세션',
		name: '리더십 개발 교육 세션',
		dateTime: '2025-03-10T15:00:00Z',
		registrationEnd: '2025-03-09T13:00:00Z',
		location: '서울 본사 3층 강의실',
		participantCount: 15,
		capacity: 25,
		image: 'training.jpg',
		createdBy: 505,
		canceledAt: '',
	},
];

function MyPage() {
	return (
		<div>
			<div className='flex flex-col gap-1 p-4'>
				ProgressBar(20/40)
				<ProgressBar max={40} value={20} isNeutral={true} isAnimate={false} />
				ProgressBar(20/140)
				<ProgressBar max={140} value={20} isNeutral={false} isAnimate={true} />
				Badge
				<div className='flex gap-2'>
					<Badge content={1024} />
					<Badge content={'0'} />
					<Badge content={'19'} />
				</div>
				Review Hearts
				<HeartRatings rating={2.7} maxHearts={5} />
				<HeartRatings rating={4.8} maxHearts={5} />
				<HeartRatings rating={5} maxHearts={5} />
				<HeartRatings rating={0} maxHearts={5} />
				Mypage Hearts
				{/* @ts-ignore 공통 컴포넌트 시각화를 위한 페이지이므로 여기서는 타입 검사 생략  */}
				<HeartRatings rating={0} maxHearts={5} handleChange={true} />
			</div>
			Members
			<Members max={10} value={10} />
			<Members max={10} value={15} highLight={'off'} />
			<Members max={10} value={5} />
			<div className='flex flex-col items-start max-w-80 gap-2 p-1'>
				<div>
					<span className='block'>Default Button</span>
					<Button state='default' isOutlined={false} type='button'>
						생성하기
					</Button>
				</div>
				<div className='w-full'>
					<span className='block'>Full Button</span>
					<Button state='default' isOutlined={true} type='submit' isFull={true}>
						생성하기
					</Button>
				</div>
			</div>
			Modal
			<div className='flex flex-col items-start gap-2 mt-3'>
				<Link
					href={'/mypage/create-review/3'}
					className='bt-white text-orange-700 border border-orange-700 inline-flex px-[3rem] py-2 rounded-xl justify-center item-center'
					scroll={false}
				>
					Open Modal with Routes
				</Link>
				<GlobalModal />
			</div>
			<Link href={'/mypage/my-profile'}>마이페이지 열기</Link>
			<ProfileForm />
			MyCards
			<div className='px-4'>
				{mockMeetings?.map((data) => (
					<Link
						href={`/meeting/${data.id}`}
						key={data.id}
						className='meeting-card block'
					>
						<CardBase data={data}>
							<CardBase.JoinedMeetingCard />
						</CardBase>
					</Link>
				))}
				{mockMeetings?.map((data) => (
					<Link
						href={`/meeting/${data.id}`}
						key={data.id}
						className='meeting-card block'
					>
						<CardBase data={data}>
							<CardBase.HostedMeetingCard />
						</CardBase>
					</Link>
				))}
			</div>
			Profile
			<div className='mx-[3rem]'>
				<ProfileHeader />
			</div>
			<Link href={'/mypage/my-profile'}></Link>
		</div>
	);
}

export default MyPage;
