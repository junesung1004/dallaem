import {
	FilteringData,
	PageInfoData,
	PageNavData,
} from '@/types/pageComponentType';

/** API URL */
export const BASE_URL =
	typeof window !== 'undefined'
		? process.env.NEXT_PUBLIC_BASE_URL // 클라이언트에서 사용
		: process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL; // 서버에서 사용

export const PAGE_INFO: Record<string, PageInfoData> = {
	meetings: {
		title: '함께 할 사람이 없나요?',
		description: '지금 모임에 참여해보세요',
		src: '/images/head/headClass.svg',
	},
	saved: {
		title: '찜한 모임',
		description: '지금 모임에 참여해보세요',
		src: '/images/head/headSaved.svg',
	},
	reviews: {
		title: '모든 리뷰',
		description: '같이달램을 이용한 분들은 이렇게 느꼈어요🫶',
		src: '/images/head/headReview.svg',
	},
};

export const NAV_DATA: Record<string, PageNavData[]> = {
	meetings: [
		{
			id: 'DALLAEMFIT',
			label: '달램핏',
			icon: '/icons/dalaemfit.svg',
			active: true,
			subItems: [
				// 해당 메인 아이템에 종속된 subItems
				{ id: 'DALLAEMFIT', label: '전체', active: true },
				{
					id: 'OFFICE_STRETCHING',
					label: '오피스 스트레칭',
					active: false,
				},
				{
					id: 'MINDFULNESS',
					label: '마인드풀니스',
					active: false,
				},
			],
		},
		{
			id: 'WORKATION',
			label: '워케이션',
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
