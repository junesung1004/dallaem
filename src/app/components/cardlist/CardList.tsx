'use client';

import { DateBadge } from '../DateBadge';
import { LikeButton } from '../LikeButton';
import Card from './Card';

type Dummy = {
	id: number;
	isClear: boolean;
};

export default function CardList() {
	const dummy: Dummy[] = [
		{ id: 1, isClear: false },
		{ id: 2, isClear: true },
		{ id: 3, isClear: false },
		{ id: 4, isClear: true },
		{ id: 5, isClear: false },
		{ id: 6, isClear: false },
		{ id: 7, isClear: true },
		{ id: 8, isClear: false },
		{ id: 9, isClear: false },
	];

	return (
		<div className='flex flex-col items-center gap-6'>
			{dummy.map((el) => (
				<Card key={el.id} isClear={el.isClear}>
					<Card.ImageSection src='/images/imgLogin.png' alt='이미지 예시' />
					<Card.Content>
						<Card.Header>
							{/* 왼쪽 섹션 */}
							<Card.Header.Left
								title='달램핏 오피스 스트레칭 |'
								place='을지로 3가'
							>
								<DateBadge text='2025-02-11T00:29:52.866Z' type='date' />
								<DateBadge text='2025-02-11T00:29:52.866Z' type='time' />
							</Card.Header.Left>

							{/* 오른쪽 섹션 (찜 버튼) */}
							<Card.Header.Right>
								<LikeButton itemId={el.id} />
							</Card.Header.Right>
						</Card.Header>
						<Card.Footer
							max={40}
							value={30}
							onClick={() => {
								// console.log('푸터 클릭');
							}}
						/>
					</Card.Content>
				</Card>
			))}
		</div>
	);
}
