'use client';

import Button from '@/components/Button/Button';
import Dialog from '@/components/Dialog/Dialog';
import ProfileInput from '../ProfileInput/ProfileInput';
import FormControl from './FormControl';

function ProfileForm() {
	return (
		<form>
			<Dialog>
				<Dialog.Content title='프로필 수정하기'>
					<div className='flex flex-col gap-4 mb-[24px]'>
						<ProfileInput />
						<FormControl.InputControl
							id='company'
							title='회사'
							name='company'
						/>
						<FormControl.InputControl
							id='email'
							title='이메일'
							name='email'
							disabled={true}
							value={'@codeit.com'}
						/>
					</div>
				</Dialog.Content>
				<Dialog.ButtonContainer>
					<Button
						state='default'
						isOutlined={true}
						isFull={true}
						onClick={() => {}}
						type='button'
					>
						취소
					</Button>
					<Button
						state={'default'}
						isOutlined={false}
						isFull={true}
						disabled={false}
					>
						수정 하기
					</Button>
				</Dialog.ButtonContainer>
			</Dialog>
		</form>
	);
}

export default ProfileForm;
