import ProgressBar from '@/app/components/ProgressBar/ProgressBar';
import Badge from '@/app/components/Badge/Badge';
import HeartRatings from '@/app/components/HeartRatings/HeartRatings';
import Members from '@/app/components/Members/Members';
import Button from '@/app/components/Button/Button';

function MyPage() {
	return (
		<div>
			<div className='flex flex-col gap-1 p-4'>
				ProgressBar(20/40)
				<ProgressBar max={40} value={20} isNeutral={true} isAnimate={false} />
				ProgressBar(20/140)
				<ProgressBar max={140} value={20} isNeutral={false} isAnimate={true} />
				Badge
				<div className='flex gap-2'>
					<Badge content={1024} />
					<Badge content={'0'} />
					<Badge content={'19'} />
				</div>
				Review Hearts
				<HeartRatings rating={2.7} maxHearts={5} />
				<HeartRatings rating={4.8} maxHearts={5} />
				<HeartRatings rating={5} maxHearts={5} />
				<HeartRatings rating={0} maxHearts={5} />
				Mypage Hearts
				<HeartRatings rating={0} maxHearts={5} isInteractive={true} />
			</div>
			Members
			<Members max={10} value={10} />
			<Members max={10} value={15} />
			<Members max={10} value={5} />
			<div className='flex flex-col items-start max-w-80 gap-2 p-1'>
				<div>
					<span className='block'>Default Button</span>
					<Button state='default' isOutlined={false} type='button'>
						생성하기
					</Button>
				</div>
				<div className='w-full'>
					<span className='block'>Full Button</span>
					<Button state='default' isOutlined={true} type='submit' isFull={true}>
						생성하기
					</Button>
				</div>
			</div>
		</div>
	);
}

export default MyPage;
