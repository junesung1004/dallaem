interface PageInfoData {
	title: string;
	description: string;
	src: string;
}

export const PAGE_INFO: Record<string, PageInfoData> = {
	meetings: {
		title: '함께 할 사람이 없나요?',
		description: '지금 모임에 참여해보세요',
		src: '/images/head/headClass.png',
	},
	saved: {
		title: '찜한 모임',
		description: '지금 모임에 참여해보세요',
		src: '/images/head/headSaved.png',
	},
	reviews: {
		title: '모든 리뷰',
		description: '같이달램을 이용한 분들은 이렇게 느꼈어요🫶',
		src: '/images/head/headReview.png',
	},
};
