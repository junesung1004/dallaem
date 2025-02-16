'use client';

import Button from '@/components/Button/Button';
import Dialog from '@/components/Dialog/Dialog';
import ProfileInput from '../ProfileInput/ProfileInput';
import { SignupInputSection } from '@/components/Signup/SignupInputSection';

function ProfileForm() {
	return (
		<form id='asdfasdf'>
			<Dialog>
				<Dialog.Content title='프로필 수정하기'>
					<ProfileInput />
					{/* Section: 회사명 */}
					<SignupInputSection
						id='companyName'
						type='text'
						title={'회사'}
						placeholderText={'회사명을 입력해주세요.'}
						// value={}
						// onChange={}
						// errorMsg={}
						// onFocus={}
						// onBlur={}
						// isError={}
					/>
					{/* Section: 아이디 */}
					<SignupInputSection
						id='id'
						type='text'
						title={'이메일'}
						placeholderText={'아이디를 입력해주세요.'}
						// value={}
						// onChange={}
						// errorMsg={}
						// onFocus={}
						// onBlur={}
						// isError={}
					/>
				</Dialog.Content>
				<Dialog.ButtonContainer>
					{/* <Button
						state='default'
						isOutlined={true}
						isFull={true}
						onClick={}
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
					</Button> */}
				</Dialog.ButtonContainer>
			</Dialog>
		</form>
	);
}

export default ProfileForm;
