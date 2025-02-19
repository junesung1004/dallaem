export const getMeetingData = async () => {
	// 숫자 변환 후 기본값 설정
	const limit = 10; // 숫자가 아니라면 5로 설정
	const offset = 12; // 숫자가 아니라면 0으로 설정

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/gatherings?limit=${limit}&offset=${offset}`,
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
