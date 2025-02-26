'use client';
import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';

import { signupUser } from '@/api/userAuth';
import { SignupInputSection } from './SignupInputSection';

const fieldNames = [
	'name',
	'id',
	'companyName',
	'password',
	'passwordConfirm',
] as const;

const fieldTitles: Record<FieldType, string> = {
	name: '이름',
	id: '아이디',
	companyName: '회사명',
	password: '비밀번호',
	passwordConfirm: '비밀번호 확인',
};

const fieldErrorDefault: Record<FieldType, string> = {
	name: '이름을 입력해주세요',
	id: '아이디를 입력해주세요',
	companyName: '회사명을 입력해주세요',
	password: '비밀번호를 입력해주세요',
	passwordConfirm: '비밀번호를 다시 한 번 입력해주세요',
};

type FieldType = (typeof fieldNames)[number];

const Signup = () => {
	const router = useRouter();
	const debouncingTimer = useRef<NodeJS.Timeout | null>(null);

	/* 변수: 회원가입 인풋 상태관리 */
	const [formData, setFormData] = useState<Record<FieldType, string>>({
		name: '',
		id: '',
		companyName: '',
		password: '',
		passwordConfirm: '',
	});

	/* 변수: 회원가입 인풋 에러 상태관리 */
	const [errors, setErrors] = useState<Record<FieldType, string>>({
		name: '',
		id: '',
		companyName: '',
		password: '',
		passwordConfirm: '',
	});

	/* 함수: onChange: 값 변경 및 작성중이면 에러 메시지 제거*/
	const onChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		type: FieldType,
	) => {
		setFormData((prev) => ({ ...prev, [type]: e.target.value }));
		if (errors[type]) setErrors((prev) => ({ ...prev, [type]: '' }));
	};

	/* 함수: 작성 중 인풋 에러 처리  */
	//모든 필드 빈 값 에러 처리
	const validateEmpty = (type: FieldType) => {
		if (!formData[type]) {
			setErrors((prev) => ({
				...prev,
				[type]: fieldErrorDefault[type],
			}));
		}
	};

	//추가 에러 처리

	const validators: Record<FieldType, () => void> = {
		name: () => {},
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
		//회사명: 3자 미만일 때, 12자 초과할 때
		companyName: () => {
			setErrors((prev) => ({
				...prev,
				companyName:
					formData.companyName.length < 3 || formData.companyName.length > 12
						? '회사명은 3자 이상, 12자 이하여야 합니다'
						: '',
			}));
		},
		password: () => {
			setErrors((prev) => ({
				...prev,
				password:
					formData.password.length < 8
						? '비밀번호는 최소 8자 이상이어야 합니다'
						: '',
			}));
		},
		passwordConfirm: () => {
			setErrors((prev) => ({
				...prev,
				passwordConfirm:
					formData.password !== formData.passwordConfirm
						? '비밀번호가 일치하지 않습니다.'
						: '',
			}));
		},
	};

	/* 함수: handleSubmit) 회원가입 및 제출 시 에러 처리*/
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// 회사명 길이 체크
		if (formData.companyName.length < 3 || formData.companyName.length > 12) {
			setErrors((prev) => ({
				...prev,
				companyName: '회사명은 3자 이상, 12자 이하여야 합니다',
			}));
			return;
		}

		try {
			await signupUser({
				email: formData.id.trim(),
				password: formData.password.trim(),
				name: formData.name.trim(),
				companyName: formData.companyName,
			});
			// 에러 초기화 후 이전 페이지로 이동
			setErrors({
				name: '',
				id: '',
				companyName: '',
				password: '',
				passwordConfirm: '',
			});
			router.back();
		} catch (err: any) {
			const errorMessages: Record<string, string> = {
				'유효한 이메일 주소를 입력하세요': 'id',
				'비밀번호는 최소 8자 이상이어야 합니다': 'password',
				'이미 사용 중인 이메일입니다': 'id',
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

	return (
		<div className='bg-white rounded-3xl py-8 px-4 md:px-[3.375rem]'>
			<form
				onSubmit={handleSubmit}
				className='mx-auto flex flex-col justify-between gap-[24px]'
			>
				{/* Section: 제목 */}
				<div className='flex justify-center text-[20px] md:text-[24px] '>
					<span>회원가입</span>
				</div>
				{fieldNames.map((field) => (
					<SignupInputSection
						key={field}
						id={field}
						type={
							field === 'password' || field === 'passwordConfirm'
								? 'password'
								: 'text'
						}
						title={fieldTitles[field]}
						placeholderText={fieldErrorDefault[field]}
						value={formData[field]}
						onChange={(e) => onChange(e, field)}
						onFocus={() => handleFocus(field)}
						onBlur={() => handleBlur(field)}
						errorMsg={errors[field]}
						isError={!!errors[field]}
					/>
				))}

				{/* Section: 회원가입 버튼 */}
				<div className='flex justify-center items-center'>
					{isActive ? (
						<button
							className='w-full h-[40px] md:h-[44px] bg-orange-600 text-white rounded-xl'
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
				</div>
			</form>
		</div>
	);
};
export { Signup };
