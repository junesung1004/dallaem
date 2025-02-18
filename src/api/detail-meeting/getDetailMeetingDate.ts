export const getDetailMeetingData = async (id: string) => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/7/gatherings/${id}`,
		);

		if (!res.ok) {
			throw new Error(`서버 오류: ${res.status} ${res.statusText}`);
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(`상세 페이지 데이터 가져오기 실패:`, error);
		return null;
	}
};
