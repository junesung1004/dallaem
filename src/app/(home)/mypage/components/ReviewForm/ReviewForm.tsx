'use client';

import Dialog from '@/components/Dialog/Dialog';
import HeartRatings from '@/components/HeartRatings/HeartRatings';
import TextBox from './TextBox';
import Button from '@/components/Button/Button';
import { useCreateReview } from '@/hooks/customs/useCreateReview';

function ReviewForm() {
	const { state, handleChange, handleSubmit, handleClose } = useCreateReview({
		valid: false,
		comment: '',
		score: 0,
	});

	return (
		<form onSubmit={handleSubmit}>
			<Dialog>
				<div className='flex flex-col gap-8'>
					<Dialog.Content title='리뷰쓰기'>
						<div className='flex flex-col gap-6'>
							<FormControl title='만족스러운 경험이었나요?'>
								<HeartRatings
									rating={state.score}
									maxHearts={5}
									handleChange={handleChange}
								/>
							</FormControl>
							<FormControl title='경험에 대해 남겨주세요.'>
								<div className='md:min-w-[471px] md:min-h-[120px] md:max-w-[471px] md:max-h-[120px] min-w-[308px] min-h-[156px] bg-gray-50 px-4 py-2 focus-within:outline focus-within:outline-2 focus-within:outline-primary-600 rounded-xl'>
									<TextBox
										placeholder={
											'남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다.'
										}
										name={'comment'}
										typhograpy='text-base font-medium'
										onChange={handleChange}
										content={state.comment}
									/>
								</div>
							</FormControl>
						</div>
					</Dialog.Content>
					<Dialog.ButtonContainer>
						<Button
							state='default'
							isOutlined={true}
							isFull={true}
							onClick={handleClose}
							type='button'
						>
							취소
						</Button>
						<Button
							state={state.valid ? 'default' : 'disabled'}
							isOutlined={false}
							isFull={true}
							disabled={!state.valid}
						>
							리뷰 등록
						</Button>
					</Dialog.ButtonContainer>
				</div>
			</Dialog>
		</form>
	);
}

function FormControl({
	children,
	title,
}: {
	children: React.ReactNode;
	title: string;
}) {
	return (
		<section className='flex flex-col gap-2'>
			<h5 className='text-base font-semibold'>{title}</h5>
			{children}
		</section>
	);
}

export default ReviewForm;
