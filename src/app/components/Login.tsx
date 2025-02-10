import { useState } from 'react';
import { InputWindow } from './InputWindow';
import Form from 'next/form';

const Login = () => {
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	// 입력 handle 함수
	const onIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setId(e.target.value);
	};
	const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	return (
		<div className="w-full h-full bg-white rounded-3xl px-5">
			<Form action="/login" className="w-[90%] h-full mx-auto">
				<div className="w-full h-1/4 flex justify-center items-center">
					<span className="text-xl">로그인</span>
				</div>
				<div className="h-1/4">
					<span className="text-sm">아이디</span>
					<InputWindow
						placeholderText="이메일을 입력해주세요."
						onChange={onIdChange}
						value={id}
					/>
				</div>
				<div className="h-1/4 relative">
					<span className="text-sm">비밀번호</span>
					<InputWindow
						placeholderText="비밀번호를 입력해주세요."
						onChange={onPasswordChange}
						value={password}
					/>
				</div>
				<div className="h-1/4 flex flex-col justify-center items-center">
					<button className="w-full aspect-[311/40] bg-gray-400 rounded-xl">
						확인
					</button>
					<div className="text-sm text-gray-800 my-3 flex gap-2">
						<span>같이달램이 처음이신가요?</span>
						<span>회원가입</span>
					</div>
				</div>
			</Form>
		</div>
	);
};
export { Login };
