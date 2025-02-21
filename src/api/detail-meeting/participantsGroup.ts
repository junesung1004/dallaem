export const participantsGroup = async (id: number) => {
	const token = localStorage.getItem('authToken');

	if (!token) {
		throw new Error('인증 토큰이 없습니다.');
	}
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/gatherings/${id}/participants`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || `서버 오류: ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('서버 응답 상태 코드:', error);

		throw error;
	}
};

export const leaveGroup = async (id: number) => {
	const token = localStorage.getItem('authToken');

	if (!token) {
		throw new Error('인증 토큰이 없습니다.');
	}
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/gatherings/${id}/leave`,
			{
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || `서버 오류: ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('서버 응답 상태 코드:', error);

		throw error;
	}
};
