import Image from 'next/image';

export const StatusBadge = ({
	participantCount,
}: {
	participantCount: number;
}) => {
	if (participantCount < 5) return null;

	return (
		<div className='flex items-center gap-1 text-orange-500 text-sm font-medium'>
			<Image src='/icons/status.png' alt='개설 확정' width={16} height={16} />
			개설 확정
		</div>
	);
};
