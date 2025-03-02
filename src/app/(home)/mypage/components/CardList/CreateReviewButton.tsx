'use client';

import Button from '@/components/Button/Button';
import { useRouter, useParams } from 'next/navigation';

function CreateReviewButton() {
	const router = useRouter();
	const params = useParams();

	return (
		<Button
			variation='outline'
			onClick={(e: React.MouseEvent) => {
				/** 모임 상세 페이지로 이동하지 않도록 기본 동작 막음 */
				e.preventDefault();
				e.stopPropagation();

				router.push(`/mypage/create-review/${1826}`, { scroll: false });
			}}
		>
			리뷰 작성하기
		</Button>
	);
}

export default CreateReviewButton;
