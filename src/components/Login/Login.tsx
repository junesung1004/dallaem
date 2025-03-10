'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { InputWindow } from '../InputSection/InputWindow';

import { signinUser } from '@/api/userAuth';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { getUserData } from '@/api/getUserData';
import { HideToggleButton } from '../InputSection/HideToggleButton';
import Link from 'next/link';

const fieldNames = ['id', 'password'] as const;
type FieldType = (typeof fieldNames)[number];

const fieldTitles: Record<FieldType, string> = {
	id: '아이디',
	password: '비밀번호',
};

const fieldErrorDefault: Record<FieldType, string> = {
	id: '아이디를 입력해주세요',
	password: '비밀번호를 입력해주세요',
};

const Login = () => {
	const router = useRouter();
	const [referrer, setReferrer] = useState<string | null>(null); // referrer 상태 추가
	const debouncingTimer = useRef<NodeJS.Timeout | null>(null);
	const { setState, email } = useAuthStore();

	//상태관리 변수
	const [formData, setFormData] = useState<Record<FieldType, string>>({
		id: '',
		password: '',
	});

	const [errors, setErrors] = useState<Record<FieldType, string>>({
		id: '',
		password: '',
	});

	const [isHidden, setIsHidden] = useState(true); //비밀번호 숨김 토글 관리

	// 클라이언트 사이드에서 referrer를 설정하는 useEffect
	useEffect(() => {
		setReferrer(document.referrer); // referrer 값 클라이언트 사이드에서만 설정
	}, []);

	// 입력 handle 함수
	const onChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		type: FieldType,
	) => {
		setFormData((prev) => ({ ...prev, [type]: e.target.value }));
		if (errors[type]) setErrors((prev) => ({ ...prev, [type]: '' }));
	};

	const onHideToggleChange = () => {
		setIsHidden((prev) => !prev);
	};

	//로그인 함수. 실패 시에 에러 메시지 설정
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await signinUser({
				email: formData.id.trim(),
				password: formData.password.trim(),
			});
			// 전역 상태변수 저장
			const user = await getUserData();
			setState({
				isLoggedIn: true,
				token: localStorage.getItem('authToken'),
				userId: user.id,
				companyName: user.companyName,
				name: user.name,
				email: user.email,
			});

			// 에러 초기화 후 이전 페이지로 이동
			setErrors({
				id: '',
				password: '',
			});
			router.back();
		} catch (err: any) {
			const errorMessages: Record<string, string> = {
				'존재하지 않는 아이디입니다': 'id',
				'비밀번호가 아이디와 일치하지 않습니다': 'password',
			};
			if (errorMessages[err.message]) {
				setErrors((prev) => ({
					...prev,
					[errorMessages[err.message]]: err.message,
				}));
			} else {
				console.error(err.message);
			}
		}
	};

	useEffect(() => {
		console.log(email);
	}, [email]);

	//함수: 빈칸 유효성 검사 함수
	const validateEmpty = (type: FieldType) => {
		if (!formData[type]) {
			setErrors((prev) => ({
				...prev,
				[type]: fieldErrorDefault[type],
			}));
		}
	};

	const validators: Record<FieldType, () => void> = {
		//아이디: 유효한 이메일 형식이 아닐 경우
		id: () => {
			const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
			setErrors((prev) => ({
				...prev,
				id: !emailRegex.test(formData.id)
					? '유효하지 않은 이메일 형식입니다'
					: '',
			}));
		},
		password: () => {},
	};

	/* 함수: onFocus) Input 창을 포커스 할 경우 1초 후에 빈값 유효성 검사 시작한다. 모든 필드에서 빈값 에러 처리 */
	const handleFocus = (type: FieldType) => {
		if (debouncingTimer.current) clearTimeout(debouncingTimer.current);
		debouncingTimer.current = setTimeout(() => validateEmpty(type), 500);
	};

	/* 함수: onBlur) Input 창을 벗어나면 형식 유효성 검사 진행한다. Input 창이 빈칸일 경우 에러 메시지를 제거한다. */
	const handleBlur = (type: FieldType) => {
		if (!formData[type]) {
			setErrors((prev) => ({ ...prev, [type]: '' }));
		} else {
			setErrors((prev) => ({ ...prev, [type]: '' })); //에러  초기화 후 다시 유효성 검증
			validators[type]();
		}
	};

	//useMemo: 작성 완료하면 회원가입 버튼을 활성화 상태로 바꾼다.
	const isActive = useMemo(
		() => fieldNames.every((field) => formData[field] && !errors[field]),
		[formData, errors],
	);

	// return
	return (
		<div className='bg-white rounded-3xl py-8 px-[16px] md:px-[54px]'>
			<form
				onSubmit={handleSubmit}
				className='mx-auto flex flex-col justify-between'
			>
				{/* Section: 제목 */}
				<div className='h-[60px] flex justify-center text-[20px] md:text-[24px] '>
					<span>로그인</span>
				</div>
				<div className='innerContents flex flex-col gap-[40px]'>
					<div className='ID-PW flex flex-col gap-[24px]'>
						{/* Section: ID */}

						<div className='text-[14px] flex flex-col gap-[8px]'>
							<span>아이디</span>
							<InputWindow
								placeholderText='이메일을 입력해주세요.'
								onChange={(e) => onChange(e, 'id')}
								value={formData['id']}
								type='text'
								isError={errors['id'] ? true : false}
								onBlur={() => handleBlur('id')}
								onFocus={() => handleFocus('id')}
							/>
							{/* 에러 메시지: 아이디가 존재하지 않습니다 */}
							{errors['id'] && (
								<span className='text-red-600'>{errors['id']}</span>
							)}
						</div>

						{/* Section: Password */}

						<div className='text-[14px] flex flex-col gap-[8px]'>
							<span>비밀번호</span>
							<div className='relative'>
								<InputWindow
									placeholderText='비밀번호를 입력해주세요.'
									onChange={(e) => onChange(e, 'password')}
									onFocus={() => handleFocus('password')}
									onBlur={() => handleBlur('password')}
									value={formData['password']}
									type={isHidden ? 'password' : 'text'}
									isError={errors['password'] ? true : false}
								/>
								<HideToggleButton
									onClick={onHideToggleChange}
									isHidden={isHidden}
									className='absolute inset-y-3 right-2'
								/>
							</div>
							{errors['password'] && (
								<span className='text-red-600'>{errors['password']}</span>
							)}
						</div>
					</div>

					{/* Section: 로그인 버튼. 활성화 / 비활성화 */}
					<div className='Button flex flex-col justify-center items-center gap-[24px]'>
						{isActive ? (
							<button
								className='w-full h-[40px] md:h-[44px] bg-primary-600 rounded-xl text-white'
								onClick={handleSubmit}
								type='submit'
							>
								확인
							</button>
						) : (
							<button
								className='w-full h-[40px] md:h-[44px] bg-gray-400 rounded-xl'
								onClick={handleSubmit}
								type='submit'
							>
								확인
							</button>
						)}

						<div className='text-[15px] text-gray-800 flex gap-[4px]'>
							<span>같이달램이 처음이신가요?</span>
							<Link className='text-primary-600' href={'/signup'}>
								회원가입
							</Link>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};
export { Login };
