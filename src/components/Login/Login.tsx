'use client';
import React, { useEffect, useRef, useState } from 'react';
import { InputWindow } from '../InputSection/InputWindow';

import { signinUser } from '@/api/userAuth';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { getUserData } from '@/api/getUserData';
import { HideToggleButton } from '../InputSection/HideToggleButton';

const Login = () => {
	const router = useRouter();
	const [referrer, setReferrer] = useState<string | null>(null); // referrer 상태 추가
	const { setIsLoggedIn, setToken, setUserId } = useAuthStore(); //zustand 상태
	const debouncingTimer = useRef<NodeJS.Timeout | null>(null);
	//상태관리 변수
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	const [isHidden, setIsHidden] = useState(true); //비밀번호 숨김 토글 관리
	const [errorId, setErrorId] = useState(''); //로그인 에러 관리
	const [errorPassword, setErrorPassword] = useState('');
	const [isActive, setIsActive] = useState(false); //로그인 버튼 활성화 관리

	// 클라이언트 사이드에서 referrer를 설정하는 useEffect
	useEffect(() => {
		setReferrer(document.referrer); // referrer 값 클라이언트 사이드에서만 설정
	}, []);
	// 입력 handle 함수
	const onIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setId(e.target.value.trim());
	};

	const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value.trim());
	};

	const onHideToggleChange = () => {
		setIsHidden((prev) => !prev);
	};

	//로그인 함수. 실패 시에 에러 메시지 설정
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			//로그인 성공. 에러 메시지 초기화. 이전 페이지로 돌아감
			await signinUser({ email: id, password: password });
			setErrorId('');
			setErrorPassword('');
			console.log('로그인 성공');

			// 상태관리 변수에 저장
			const currentToken = localStorage.getItem('authToken');
			setIsLoggedIn(true);
			setToken(currentToken);
			const getId = (await getUserData()).id;
			setUserId(getId);

			//이전 페이지로 돌아감 (외부 사이트에서 접속했을 경우 홈으로 돌아감)
			if (!referrer || !referrer.includes(window.location.hostname)) {
				router.push('/');
			} else {
				router.back();
			}
		} catch (err: any) {
			console.log('로그인 실패');
			//로그인 실패. 에러 메시지 저장
			if (err.message === '존재하지 않는 아이디입니다') {
				setErrorId(err.message);
			} else if (err.message === '비밀번호가 아이디와 일치하지 않습니다') {
				setErrorPassword(err.message);
			}
		}
	};

	//함수: 아이디 빈칸, 형식 유효성 검사 함수
	const validateIdEmpty = () => {
		if (id === '') {
			setErrorId('아이디를 입력해주세요');
		} else {
			setErrorId('');
			return;
		}
	};

	const validateIdForm = () => {
		const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
		if (id === '') {
			setErrorId('');
		} else if (!email_regex.test(id)) {
			setErrorId('유효하지 않은 이메일 형식입니다');
		} else {
			setErrorId('');
			return;
		}
	};

	//함수: onFocus) Input 창을 포커스 할 경우 1초 후에 빈칸 유효성 검사 시작한다.
	const handleFocus = () => {
		if (debouncingTimer.current) {
			clearTimeout(debouncingTimer.current);
		}
		debouncingTimer.current = setTimeout(() => {
			validateIdEmpty();
		}, 1000);
	};

	//함수: onBlur) Input 창을 벗어나면 형식 유효성 검사 진행한다. id가 빈칸일 경우 에러 메시지를 제거한다.
	const handleFocusOut = () => {
		validateIdForm();
	};

	//useEffect: 작성중이면 에러 메시지를 제거한다.
	useEffect(() => {
		setErrorId('');
	}, [id]);

	//useEffect: 작성 완료하면 로그인 버튼을 활성화 상태로 바꾼다.
	useEffect(() => {
		if (
			id !== '' &&
			password !== '' &&
			errorId === '' &&
			errorPassword === ''
		) {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [id, password]);

	// return
	return (
		<div className='bg-white rounded-3xl py-8 px-4 md:px-[3.375rem]'>
			<form
				onSubmit={handleSubmit}
				className='mx-auto flex flex-col justify-between gap-[24px]'
			>
				{/* Section: 제목 */}
				<div className='flex justify-center text-[20px] md:text-[24px] '>
					<span>로그인</span>
				</div>

				{/* Section: ID */}
				<div className='text-[14px] flex flex-col gap-[8px]'>
					<span>아이디</span>
					<InputWindow
						placeholderText='이메일을 입력해주세요.'
						onChange={onIdChange}
						value={id}
						type='text'
						isError={errorId ? true : false}
						onBlur={handleFocusOut}
						onFocus={handleFocus}
					/>
					{/* 에러 메시지: 아이디가 존재하지 않습니다 */}
					{errorId && <span className='text-red-600'>{errorId}</span>}
				</div>

				{/* Section: Password */}
				<div className='text-[14px] flex flex-col gap-[8px]'>
					<span>비밀번호</span>
					<div className='relative'>
						<InputWindow
							placeholderText='비밀번호를 입력해주세요.'
							onChange={onPasswordChange}
							value={password}
							type={isHidden ? 'password' : 'text'}
							isError={errorPassword ? true : false}
						/>
						<HideToggleButton
							onClick={onHideToggleChange}
							isHidden={isHidden}
							className='absolute inset-y-3 right-2'
						/>
					</div>
					{errorPassword && (
						<span className='text-red-600'>{errorPassword}</span>
					)}
				</div>

				{/* Section: 로그인 버튼. 활성화 / 비활성화 */}
				<div className='flex flex-col justify-center items-center gap-[24px]'>
					{isActive ? (
						<button
							className='w-full h-[40px] md:h-[44px] bg-orange-600 rounded-xl text-white'
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
						<span
							className='text-orange-600'
							onClick={() => router.push('/signup')}
						>
							회원가입
						</span>
					</div>
				</div>
			</form>
		</div>
	);
};
export { Login };
