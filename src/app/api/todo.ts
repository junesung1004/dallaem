export const getTods = async () => {
	return Promise.resolve([
		{
			id: 1,
			title: '심우석 팀장',
			completed: false,
		},
		{
			id: 2,
			title: '안예지 팀원',
			completed: false,
		},
		{
			id: 3,
			title: '황선영 팀원',
			completed: false,
		},
		{
			id: 4,
			title: '박채은 팀원',
			completed: false,
		},
		{
			id: 5,
			title: '박준성 팀원',
			completed: false,
		},
	]);
};

export const getTodoFetchData = async () => {
	const res = await fetch('주소');
	if (!res.ok) {
		throw new Error();
	}

	const data = await res.json();

	return data;
};
