const getAttendee = async (id: number) => {
	const response = await fetch(
		`https://fe-adv-project-together-dallaem.vercel.app/7/gatherings/${id}/participants`,
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

export { getAttendee };
