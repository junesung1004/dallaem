import Heart from './Heart';

interface HeartListProps {
	rating: number;
	maxHearts: number;
}

export default function HeartList({ rating, maxHearts }: HeartListProps) {
	return (
		<div className='flex'>
			{Array.from({ length: maxHearts }, (_, i) => {
				const value = Math.max(0, Math.min(1, rating - i));

				return (
					<Heart
						key={i}
						value={value}
						isAnimate={false}
						isMask={true}
						maskId={
							i + Math.random()
						} /** todo - uuid 등 고유 식별 maskId 생성 필요 */
					/>
				);
			})}
		</div>
	);
}
