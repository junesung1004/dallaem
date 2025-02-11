'use client';

import { DateBadge } from '../DateBadge';
import Card from './Card';

type Dummy = {
	id: number;
	isClear: boolean;
};

export default function CardList() {
	const dummy: Dummy[] = [
		{ id: 1, isClear: true },
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
					<Card.ImageSection
						// isClear={false}
						src='/images/imgLogin.png'
						alt='이미지 예시'
					/>
					<Card.Content>
						<Card.Header
							title='달램핏 오피스 스트레칭 |'
							place='을지로 3가'
							src='/images/save.png'
							// isClear={false}
							onClick={() => {
								// console.log('클릭');
							}}
						>
							<DateBadge
								text='2025-02-11T00:29:52.866Z'
								type='date'
								// isClear={false}
							/>
							<DateBadge
								text='2025-02-11T00:29:52.866Z'
								type='time'
								// isClear={false}
							/>
						</Card.Header>
						<Card.Footer
							max={40}
							value={30}
							// isClear={false}
							status='개설확정'
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
