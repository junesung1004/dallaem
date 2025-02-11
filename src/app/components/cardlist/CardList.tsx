'use client';

import Card from './Card';

export default function CardList() {
	return (
		<div className="flex flex-col items-center gap-6">
			<Card isClear={true}>
				<Card.ImageSection
					isClear={true}
					src="/images/Frame 2609920.png"
					alt="이미지 예시"
				/>
				<Card.Content>
					<Card.Header
						title="달램핏 오피스 스트레칭 |"
						place="을지로 3가"
						date="1월 7일"
						time="2시 30분"
						isClear={true}
						src="/images/save.png"
						onClick={() => {
							// console.log('클릭');
						}}
					/>
					<Card.Footer
						max={40}
						value={30}
						isClear={true}
						status="개설확정"
						onClick={() => {
							// console.log('푸터 클릭');
						}}
					/>
				</Card.Content>
			</Card>

			<Card isClear={false}>
				<Card.ImageSection
					isClear={false}
					src="/images/imgLogin.png"
					alt="이미지 예시"
				/>
				<Card.Content>
					<Card.Header
						title="달램핏 오피스 스트레칭 |"
						place="을지로 3가"
						date="1월 7일"
						time="2시 30분"
						src="/images/save.png"
						isClear={false}
						onClick={() => {
							// console.log('클릭');
						}}
					/>
					<Card.Footer
						max={40}
						value={30}
						isClear={false}
						status="개설확정"
						onClick={() => {
							// console.log('푸터 클릭');
						}}
					/>
				</Card.Content>
			</Card>

			<Card isClear={true}>
				<Card.ImageSection
					isClear={true}
					src="/images/imgLogin.png"
					alt="이미지 예시"
				/>
				<Card.Content>
					<Card.Header
						title="달램핏 오피스 스트레칭 |"
						place="을지로 3가"
						date="1월 7일"
						time="2시 30분"
						isClear={true}
						src="/images/save.png"
						onClick={() => {
							// console.log('클릭');
						}}
					/>
					<Card.Footer
						max={40}
						value={30}
						isClear={true}
						status="개설확정"
						onClick={() => {
							// console.log('푸터 클릭');
						}}
					/>
				</Card.Content>
			</Card>
		</div>
	);
}
