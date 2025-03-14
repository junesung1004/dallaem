function TagBase({ children }: { children: React.ReactNode }) {
	return { children };
}

/** 뱃지 기본 클래스 */
const defaultTagClass = 'px-3 py-1 rounded-full inline-block font-medium';

function MeetingState({ isDone }: { isDone: boolean }) {
	return isDone ? (
		<div className={`${defaultTagClass} bg-gray-200 text-gray-500`}>
			이용 완료
		</div>
	) : (
		<div className={`${defaultTagClass} bg-primary-100 text-primary-600`}>
			이용 예정
		</div>
	);
}

function MeetingCreateState({ isCreated }: { isCreated: boolean }) {
	return isCreated ? (
		<div
			className={`${defaultTagClass} border border-1 border-primary-100 text-primary-500 inline-flex items-center gap-1`}
		>
			<ConfirmCheck />
			개설확정
		</div>
	) : (
		<div
			className={`${defaultTagClass} border border-1 border-gray-200 text-gray-500`}
		>
			개설대기
		</div>
	);
}

/** 개설확정 체크 icon svg */
function ConfirmCheck() {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='11'
			height='8'
			viewBox='0 0 11 8'
			fill='none'
		>
			<path
				d='M1 3.24558L4.08767 6.33325L9.42092 1'
				stroke='#F97316'
				strokeWidth='1.8'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

TagBase.MeetingState = MeetingState;
TagBase.MeetingCreateState = MeetingCreateState;

export default TagBase;
