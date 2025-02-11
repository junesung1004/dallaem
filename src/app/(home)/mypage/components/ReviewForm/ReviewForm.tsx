'use client';

import HeartRatings from '@/app/components/HeartRatings/HeartRatings';

function ReviewForm() {
	return (
		<div>
			<HeartRatings
				rating={3.7} // 평점 전달
				maxHearts={5} // 최대 하트 개수
				renderHeart={(value, MaskKey, isAnimate) => (
					<HeartRatings.Heart
						key={MaskKey}
						isAnimate={isAnimate}
						isMask={true}
						value={value}
						maskId={MaskKey}
					/>
				)}
			/>
			<HeartRatings
				maxHearts={5}
				renderHeart={(value, MaskKey, isAnimate, onChange) => (
					<label key={MaskKey}>
						<HeartRatings.Heart
							isAnimate={isAnimate}
							isMask={false}
							value={value}
							maskId={MaskKey}
						/>
						<input
							type='radio'
							name='ratings'
							onChange={onChange}
							value={MaskKey}
						/>
					</label>
				)}
			></HeartRatings>
		</div>
	);
}

export default ReviewForm;
