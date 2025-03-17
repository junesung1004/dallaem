import {
	FilteringData,
	PageInfoData,
	PageNavData,
} from '@/types/pageComponentType';

/** API URL */
export const BASE_URL = process.env.BASE_URL;

export const PAGE_INFO: Record<string, PageInfoData> = {
	meetings: {
		title: '마음이 지칠 땐 함께할 친구가 필요하죠?',
		description: '함께하면 마음이 더 따뜻해질 거예요',
		src: '/images/head/headClass.svg',
	},
	saved: {
		title: '찜한 모임',
		description: '지금 모임에 참여해보세요',
		src: '/images/head/headSaved.svg',
	},
	reviews: {
		title: '모든 리뷰',
		description: '마음달램을 이용한 분들은 이렇게 느꼈어요🫶',
		src: '/images/head/headReview.svg',
	},
};

export const NAV_DATA: Record<string, PageNavData[]> = {
	meetings: [
		{
			id: 'DALLAEMFIT',
			label: '심리지원',
			icon: '/icons/dalaemfit.svg',
			active: true,
			subItems: [
				// 해당 메인 아이템에 종속된 subItems
				{ id: 'DALLAEMFIT', label: '전체', active: true },
				{
					id: 'OFFICE_STRETCHING',
					label: '상담 프로그램',
					active: false,
				},
				{
					id: 'MINDFULNESS',
					label: '마음의 캔버스',
					active: false,
				},
			],
		},
		{
			id: 'WORKATION',
			label: '마음쉼터',
			icon: '/icons/workation.svg',
			active: false,
			subItems: [], // 서브 아이템이 없는 경우 빈 배열
		},
	],
	mypage: [
		{
			id: 'meetings',
			label: '나의 모임',
			active: true,
		},
		{
			id: 'reviews',
			label: '나의 리뷰',
			active: false,
			subItems: [
				{
					id: 'writable',
					label: '작성 가능한 리뷰',
					active: true,
				},
				{
					id: 'written',
					label: '작성한 리뷰',
					active: false,
				},
			],
		},
		{
			id: 'createdMeetings',
			label: '내가 만든 모임',
			active: false,
		},
	],
};

export const FITERING_DATA: Record<string, FilteringData[]> = {
	location: [
		{
			label: '지역 전체',
			value: '',
		},
		{
			label: '건대입구',
			value: '건대입구',
		},
		{
			label: '을지로 3가',
			value: '을지로3가',
		},
		{
			label: '신림',
			value: '신림',
		},
		{
			label: '홍대입구',
			value: '홍대입구',
		},
	],
	date: [
		{
			label: '날짜 전체',
			value: '',
		},
	],
	sortByMeeting: [
		{
			label: '날짜 순',
			value: 'dateTime',
		},
		{
			label: '마감 임박',
			value: 'registrationEnd',
		},
		{
			label: '참여 인원 순',
			value: 'participantCount',
		},
	],
	sortByReview: [
		{
			label: '최신 순',
			value: 'createdAt',
		},
		{
			label: '평점 높은 순',
			value: 'score',
		},
		{
			label: '참여 인원 순',
			value: 'participantCount',
		},
	],
};

export const REVIEW_SCORES = {
	averageScore: 0,
	fiveStars: 0,
	fourStars: 0,
	threeStars: 0,
	twoStars: 0,
	oneStar: 0,
};
