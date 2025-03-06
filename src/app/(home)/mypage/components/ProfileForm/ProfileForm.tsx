'use client';

import Button from '@/components/Button/Button';
import Dialog from '@/components/Dialog/Dialog';
import ProfileInput from '../ProfileInput/ProfileInput';
import FormControl from './FormControl';
import { useEffect, useState } from 'react';
import { editProfile } from '@/api/users';
import type { IUser } from '@/types/userType';
import { useRouter } from 'next/navigation';
import { useProfile, useProfileActions } from '@/store/useAuthStore';

function ProfileForm() {
	const router = useRouter();
	const { image, companyName, email } = useProfile();
	const [formState, setFormState] = useState<Record<string, string | null>>({
		image: image,
		companyName: companyName,
	});

	// 폼 유효성 상태
	const [isValid, setIsValid] = useState(false);

	const handleFormChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		// 이전 상태 값과 통합하여 유효성 검사(빈 값인지 비교)
		const { name, value } = e.target;

		// 상태 업데이트
		setFormState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	useEffect(() => {
		// formState가 변경될 때마다 유효성 검사
		/**
		 * @history 2025-02-26 swagger 기준 프로필 이미지 등록이 필수값으로 이해했는데 null 값이 허용임을 확인 -> 회사명 빈 값으로만 유효성 검사 수정
		 */
		// const isValid = Object.values(formState).every((val) => val.trim() !== '');
		const isValid = formState.companyName?.trim()?.length !== 0;
		setIsValid(isValid);
	}, [formState]); // formState가 변경될 때마다 실행됨

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data = await editProfile(formData);

		const refreshPreviousPage = () => {
			router.back(); // 이전 페이지로 이동
			setTimeout(() => {
				router.refresh(); // 이전 페이지 새로고침
			}, 100); // 약간의 딜레이를 줘야 적용됨
		};

		if (data) {
			// useMutation 으로 변경 예정
			refreshPreviousPage();
		}
	};
	return (
		<form onSubmit={handleSubmit}>
			<Dialog>
				<Dialog.Content title='프로필 수정하기'>
					<div className='flex flex-col gap-4 mb-[24px]'>
						<ProfileInput
							image={formState.image}
							onImageChange={handleFormChange}
						/>
						<FormControl.InputControl
							id='company'
							title='회사'
							name='companyName'
							value={formState.companyName ?? ''}
							onChange={handleFormChange}
						/>
						<FormControl.InputControl
							id='email'
							title='이메일'
							name='email'
							disabled={true}
							value={email ?? ''}
							readOnly={true}
						/>
					</div>
				</Dialog.Content>
				<Dialog.ButtonContainer>
					<Button
						variation='outline'
						isFull={true}
						onClick={() => {
							router.back();
						}}
						type='button'
					>
						취소
					</Button>
					<Button isFull={true} disabled={!isValid} type='submit'>
						수정 하기
					</Button>
				</Dialog.ButtonContainer>
			</Dialog>
		</form>
	);
}

export default ProfileForm;
