interface BadgeProps {
	content: number | string | '';
}

function Badge({ content }: BadgeProps) {
	let notiContent = content.toString();

	if (!notiContent?.length) {
		return;
	}

	/** 숫자가 999 가 넘으면 999+로 표시 */
	if (parseInt(notiContent) > 999) {
		notiContent = '999+';
	}
	return (
		<span
			className={'inline-block bg-gray-900 text-white px-[7px] rounded-[8.5px]'}
		>
			{notiContent}
		</span>
	);
}

export default Badge;
