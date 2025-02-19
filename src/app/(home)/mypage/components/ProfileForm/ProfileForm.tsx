'use client';

import Button from '@/components/Button/Button';
import Dialog from '@/components/Dialog/Dialog';
import ProfileInput from '../ProfileInput/ProfileInput';
import FormControl from './FormControl';
import { FormEvent, useEffect, useState } from 'react';
import { editProfile } from '@/api/users';
import { getUserData } from '@/api/getUserData';
import type { IUser } from '@/types/userType';

function ProfileForm() {
	const [userData, setUserData] = useState<IUser | null>();
	const getData = async () => {
		const data = await getUserData();
		setUserData(data);
	};
	// const userData: Promise<IUser> = getData();

	useEffect(() => {
		getData();
	}, []);

	if (!userData) {
		return <div>로딩 중...</div>;
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data = await editProfile(formData);
	};
	return (
		<form onSubmit={handleSubmit}>
			<Dialog>
				<Dialog.Content title='프로필 수정하기'>
					<div className='flex flex-col gap-4 mb-[24px]'>
						<ProfileInput image={userData.image} />
						<FormControl.InputControl
							id='company'
							title='회사'
							name='companyName'
							value={userData.companyName}
						/>
						<FormControl.InputControl
							id='email'
							title='이메일'
							name='email'
							disabled={true}
							value={userData.email}
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
					<Button isFull={true} disabled={false} type='submit'>
						수정 하기
					</Button>
				</Dialog.ButtonContainer>
			</Dialog>
		</form>
	);
}

export default ProfileForm;
