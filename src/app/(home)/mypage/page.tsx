import ProgressBar from '@/app/components/ProgressBar/ProgressBar';
import Badge from '@/app/components/Badge/Badge';

function MyPage() {
	return (
		<div>
			<div className="flex flex-col gap-1 p-4">
				ProgressBar(20/40)
				<ProgressBar max={40} value={20} isNeutral={true} isAnimate={false} />
				ProgressBar(20/140)
				<ProgressBar max={140} value={20} isNeutral={false} isAnimate={true} />
				Badge
				<div className="flex gap-2">
					<Badge content={1024} />
					<Badge content={'0'} />
					<Badge content={'19'} />
				</div>
			</div>
		</div>
	);
}

export default MyPage;
