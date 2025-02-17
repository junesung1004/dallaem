export const getMeetingData = async () => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/gatherings`);

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
