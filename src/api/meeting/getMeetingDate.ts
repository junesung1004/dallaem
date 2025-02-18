export const getMeetingData = async () => {
	// 숫자 변환 후 기본값 설정
	const limit = Number(process.env.LIMIT) || 5;
	const offset = Number(process.env.OFFSET) || 12;
	const team = Number(process.env.TEAM) || 7;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/${team}/gatherings?limit=${limit}&offset=${offset}`,
		);

		if (!res.ok) {
			throw new Error(`서버 오류: ${res.status} ${res.statusText}`);
		}

		const data = await res.json();

		const filteredData = data.filter(
			(item: { image: string | null }) => item.image !== null,
		);
		return filteredData;
	} catch (error) {
		console.error('미팅 목록 가져오기 실패:', error);
		return null;
	}
};
