import Image from 'next/image';

interface DeadlineBadgeProps {
	registrationEnd: string;
}

const formatDeadlineText = (endString: string): string | null => {
	const deadline = new Date(endString);
	const now = new Date();

	const diffTime = deadline.getTime() - now.getTime();
	const diffMinutes = Math.floor(diffTime / (1000 * 60));
	const diffHours = Math.floor(diffMinutes / 60);
	if (diffMinutes <= 0) {
		return null;
	} else if (diffMinutes < 60) {
		return `잠시 후 마감`;
	} else if (diffHours < 24) {
		return `${diffHours}시간 후 마감`;
	} else {
		return `${Math.floor(diffHours / 24)}일 후 마감`;
	}
};

export const DeadlineBadge = ({ registrationEnd }: DeadlineBadgeProps) => {
	const formattedText = formatDeadlineText(registrationEnd);

	if (!formattedText) return null;

	return (
		<div
			className={`absolute top-0 right-0 bg-primary-500 text-white px-3 py-1 flex items-center gap-2 rounded-bl-2xl`}
		>
			<Image src='/icons/alarm.png' alt='시계 아이콘' width={18} height={18} />
			<div className='text-sm font-medium mr-2'>{formattedText}</div>
		</div>
	);
};
