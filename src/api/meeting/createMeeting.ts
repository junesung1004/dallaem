//모임 만들기 api
export const createMeeting = async (form: FormData) => {
	const token = localStorage.getItem('authToken');

	if (!token) {
		throw new Error('인증 토큰이 없습니다.');
	}

	const response = await fetch(`${process.env.BASE_URL}/gatherings`, {
		method: 'POST',
		headers: {
			// 'Content-Type': 'application/json',
			Authorization: `Beare ${token}`,
		},
		body: form,
	});

	if (!response.ok) {
		console.error('서버 응답 상태 코드:', response.status);
		const responseText = await response.text();
		console.error('서버 응답 본문:', responseText);
		throw new Error(`서버 오류: ${response.statusText}`);
	}

	const data = await response.json();
	return data;
};

//모임 만들 때 주최자가 모임 참여하는 api
export const joinMeeting = async (id: number) => {
	const token = localStorage.getItem('authToken');

	if (!token) {
		throw new Error('인증 토큰이 없습니다.');
	}

	try {
		const res = await fetch(`${process.env.BASE_URL}/gatherings/${id}/join`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});

		if (!res.ok) {
			throw new Error(`서버 오류 ${res.status} ${res.statusText}`);
		}

		console.log('주최자 자동 참여 완료', res);
	} catch (error) {
		console.error('주최자 모임 참여하기 api 호출 실패 : ', error);
	}
};
