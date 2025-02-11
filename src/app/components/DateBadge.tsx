export const DateBadge = ({
	text,
	type,
	isClear,
}: {
	text: string;
	type: 'date' | 'time';
	isClear?: boolean;
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
		<button
			type="button"
			className={`inline-block bg-[#111827] px-2 py-1 rounded-md text-xs ${
				type === 'date' ? 'text-white' : 'text-orange-500'
			} ${isClear === true ? 'bg-opacity-30 text-opacity-30' : undefined}`}
		>
			{formatDateOrTime(text, type)}
		</button>
	);
};
