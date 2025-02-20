export const DateBadge = ({
	text,
	type,
}: {
	text: string;
	type: 'date' | 'time';
}) => {
	const formatDateOrTime = (
		isoString: string,
		type: 'date' | 'time',
	): string => {
		const date = new Date(isoString);

		if (type === 'date') {
			const month = date.getMonth() + 1;
			const day = date.getDate();
			return `${month}월 ${day}일`;
		}

		if (type === 'time') {
			const hours = date.getHours();
			const minutes = date.getMinutes();
			return `${hours.toString().padStart(2, '0')} : ${minutes
				.toString()
				.padStart(2, '0')}`;
		}

		return '';
	};

	return (
		<span
			className={`inline-block bg-[#111827] px-2 py-1 rounded-md text-xs ${type === 'date' ? 'text-white' : 'text-orange-500'} `}
		>
			{formatDateOrTime(text, type)}
		</span>
	);
};
