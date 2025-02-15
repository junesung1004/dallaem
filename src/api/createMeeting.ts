import { CreateMeeting } from '@/types/createMeetingType';

export const createMeeting = async ({
	location,
	type,
	name,
	dateTime,
	capacity,
	image,
	registrationEnd,
}: CreateMeeting) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/gatherings`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Beare ${process.env.NEXT_PUBLIC_API_TOKEN}`,
			},
			body: JSON.stringify({
				location,
				type,
				name,
				dateTime,
				capacity,
				image,
				registrationEnd,
			}),
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
