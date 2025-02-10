import ProgressBar from '@/app/components/ProgressBar/ProgressBar';

function MyPage() {
	return (
		<div>
			<div>
				<ProgressBar max={40} value={20} isNeutral={true} isAnimate={false} />
			</div>
		</div>
	);
}

export default MyPage;
