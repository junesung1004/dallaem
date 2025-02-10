import ProgressBar from '@/app/components/ProgressBar/ProgressBar';
import Badge from '@/app/components/Badge/Badge';

function MyPage() {
	return (
		<div>
			<div>
				<ProgressBar max={40} value={20} isNeutral={true} isAnimate={false} />
				<Badge content={1024} />
			</div>
		</div>
	);
}

export default MyPage;
