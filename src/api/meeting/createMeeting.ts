export const createMeeting = async (form: FormData) => {
	const token = localStorage.getItem('authToken');

	if (!token) {
		throw new Error('인증 토큰이 없습니다.');
	}

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/gatherings`,
		{
			method: 'POST',
			headers: {
				// 'Content-Type': 'application/json',
				Authorization: `Beare ${token}`,
			},
			body: form,
		},
	);

	if (!response.ok) {
		console.error('서버 응답 상태 코드:', response.status);
		const responseText = await response.text();
		console.error('서버 응답 본문:', responseText);
		throw new Error(`서버 오류: ${response.statusText}`);
	}

	const data = await response.json();
	return data;
};
