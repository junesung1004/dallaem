'use client';
import React, { useEffect, useState } from 'react';
import { InputWindow } from '../InputWindow';
import Form from 'next/form';
import { HideToggle } from './HideToggle';
import { signinUser } from '@/app/api/userAuth';
import { getUserData } from '@/app/api/getUserData';
import { useRouter } from 'next/navigation';

const Login = () => {
	const router = useRouter();
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	const [isHidden, setIsHidden] = useState(true); //비밀번호 숨김 토글 관리
	const [error, setError] = useState<string>(''); //로그인 에러 관리

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
	// 로그인 시 에러 처리 함수
	const handleError = (message: string) => {
		setError(message);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		signinUser({ email: id, password: password, onError: handleError });
		getUserData();
	};

	useEffect(() => {});

	return (
		<div className="w-full h-full bg-white rounded-3xl px-5">
			<Form
				action="/"
				onSubmit={handleSubmit}
				className="w-[90%] h-full mx-auto flex flex-col gap-4"
			>
				<div className="w-full h-1/4 flex justify-center items-center">
					<span className="text-xl">로그인</span>
				</div>
				<div className="h-1/4 grid grid-rows-[3fr_6fr_2fr]">
					<span className="text-sm">아이디</span>
					<InputWindow
						placeholderText="이메일을 입력해주세요."
						onChange={onIdChange}
						value={id}
						type="email"
					/>
					{error === '존재하지 않는 아이디입니다' && (
						<span className="text-sm text-red-600">{error}</span>
					)}
				</div>
				<div className="h-1/4 grid grid-rows-[3fr_6fr_2fr]">
					<span className="text-sm">비밀번호</span>
					<div className="relative">
						<InputWindow
							placeholderText="비밀번호를 입력해주세요."
							onChange={onPasswordChange}
							value={password}
							type={isHidden ? 'password' : 'text'}
						/>
						<HideToggle
							onClick={onHideToggleChange}
							isHidden={isHidden}
							className="absolute inset-y-4 right-2 lg:inset-y-5"
						/>
					</div>
					{error === '비밀번호가 아이디와 일치하지 않습니다' && (
						<span className="text-sm text-red-600">{error}</span>
					)}
				</div>
				<div className="h-1/4 flex flex-col justify-center items-center">
					<button
						className="w-full aspect-[311/40] bg-gray-400 rounded-xl"
						type="submit"
					>
						확인
					</button>
					<div className="text-sm text-gray-800 my-3 flex gap-2">
						<span>같이달램이 처음이신가요?</span>
						<span
							className="text-orange-600"
							onClick={() => router.push('/signup')}
						>
							회원가입
						</span>
					</div>
				</div>
			</Form>
		</div>
	);
};
export { Login };
