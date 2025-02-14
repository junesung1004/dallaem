'use client';
import React, { useEffect, useRef, useState } from 'react';
import { InputWindow } from '../InputSection/InputWindow';

import { signinUser } from '@/api/userAuth';
import { useRouter } from 'next/navigation';
import { HideToggle } from '../Toggle/HideToggle';

const Login = () => {
	const router = useRouter();
	const referrer = document.referrer; // 이전 페이지 URL
	const debouncingTimer = useRef<NodeJS.Timeout | null>(null);
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	const [isHidden, setIsHidden] = useState(true); //비밀번호 숨김 토글 관리
	const [errorId, setErrorId] = useState(''); //로그인 에러 관리
	const [errorPassword, setErrorPassword] = useState('');

	// 입력 handle 함수
	const onIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setId(e.target.value);
	};
	const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
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
			//이전 페이지로 돌아감 (외부 사이트에서 접속했을 경우 홈으로 돌아감)
			if (!referrer || !referrer.includes(window.location.hostname)) {
				router.push('/');
			} else {
				router.back();
			}
		} catch (err: any) {
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

	// return
	return (
		<div className='w-full h-full bg-white rounded-3xl px-5'>
			<div className='w-[90%] h-full mx-auto flex flex-col justify-center gap-4'>
				{/* Section: 제목 */}
				<div className='w-full h-1/4 flex justify-center items-center'>
					<span className='text-xl md:text-2xl'>로그인</span>
				</div>

				{/* Section: ID */}
				<div className='h-1/4 grid grid-rows-[3fr_6fr_2fr]'>
					<span className='text-sm md:text-lg'>아이디</span>
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
					{errorId && <span className='text-sm text-red-600'>{errorId}</span>}
				</div>

				{/* Section: Password */}
				<div className='h-1/4 grid grid-rows-[3fr_6fr_2fr]'>
					<span className='text-sm md:text-lg'>비밀번호</span>
					<div className='relative'>
						<InputWindow
							placeholderText='비밀번호를 입력해주세요.'
							onChange={onPasswordChange}
							value={password}
							type={isHidden ? 'password' : 'text'}
							isError={errorPassword ? true : false}
						/>
						<HideToggle
							onClick={onHideToggleChange}
							isHidden={isHidden}
							className='absolute inset-y-4 right-2 lg:inset-y-5'
						/>
					</div>
					{/* 에러 메시지: 비밀번호가 틀립니다 */}
					{errorPassword && (
						<span className='text-sm text-red-600'>{errorPassword}</span>
					)}
				</div>

				{/* Section: 로그인 버튼 */}
				<div className='h-1/4 flex flex-col justify-center items-center'>
					<button
						className='w-full aspect-[311/40] bg-gray-400 rounded-xl'
						onClick={handleSubmit}
					>
						확인
					</button>
					<div className='text-sm text-gray-800 my-3 flex gap-2'>
						<span>같이달램이 처음이신가요?</span>
						<span
							className='text-orange-600'
							onClick={() => router.push('/signup')}
						>
							회원가입
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
export { Login };
