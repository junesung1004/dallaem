const getMeetingAttendee = async (meetingId: number) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/gatherings/${meetingId}/participants`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);

	if (!response.ok) {
		const error = await response.json();
		console.error(error);
		throw new Error(error.message || 'Unknown error');
	}

	const data = await response.json();
	console.log(data);
	return data;
};

export { getMeetingAttendee };
