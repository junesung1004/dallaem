'use client';
import React, { useEffect, useRef, useState } from 'react';
import { InputWindow } from '../InputWindow';
import { HideToggle } from './HideToggle';
import { signinUser } from '@/app/api/userAuth';
import { useRouter } from 'next/navigation';

const Login = () => {
	const router = useRouter();
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	const [isHidden, setIsHidden] = useState(true); //비밀번호 숨김 토글 관리
	const [error, setError] = useState<{ id?: string; password?: string }>({}); //로그인 에러 관리

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

	//로그인 함수. 인풋 유효성 검사 미통과 시에 메시지 저장
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			//로그인 성공. 에러 메시지 초기화
			await signinUser({ email: id, password: password });
			setError({ id: '', password: '' });
		} catch (err: any) {
			//로그인 실패. 에러 메시지 저장장
			console.log(err.message);
			if (err.message === '존재하지 않는 아이디입니다') {
				setError({ id: err.message, password: '' });
			} else if (err.message === '비밀번호가 아이디와 일치하지 않습니다') {
				setError({ id: '', password: err.message });
			}
		}
	};

	return (
		<div className='w-full h-full bg-white rounded-3xl px-5'>
			<div className='w-[90%] h-full mx-auto flex flex-col gap-4'>
				<div className='w-full h-1/4 flex justify-center items-center'>
					<span className='text-xl'>로그인</span>
				</div>
				{/* Section: ID */}
				<div className='h-1/4 grid grid-rows-[3fr_6fr_2fr]'>
					<span className='text-sm'>아이디</span>
					<InputWindow
						placeholderText='이메일을 입력해주세요.'
						onChange={onIdChange}
						value={id}
						type='text'
					/>
					{/* 에러 메시지: 아이디가 존재하지 않습니다 */}
					{error.id && <span className='text-sm text-red-600'>{error.id}</span>}
				</div>
				{/* Section: Password */}
				<div className='h-1/4 grid grid-rows-[3fr_6fr_2fr]'>
					<span className='text-sm'>비밀번호</span>
					<div className='relative'>
						<InputWindow
							placeholderText='비밀번호를 입력해주세요.'
							onChange={onPasswordChange}
							value={password}
							type={isHidden ? 'password' : 'text'}
						/>
						<HideToggle
							onClick={onHideToggleChange}
							isHidden={isHidden}
							className='absolute inset-y-4 right-2 lg:inset-y-5'
						/>
					</div>
					{/* 에러 메시지: 비밀번호가 틀립니다 */}
					{error.password && (
						<span className='text-sm text-red-600'>{error.password}</span>
					)}
				</div>
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
