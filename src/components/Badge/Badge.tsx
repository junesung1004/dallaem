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
		<div className='flex items-center justify-center w-[27px] h-[16px] text-center text-white text-[12px] bg-black rounded-[8.5px]'>
			<span>{content}</span>
		</div>
	);
}

export default Badge;
