'use client';
import { signinUserInterface, signupUserInterface } from '@/api/userInterface';
import { useStore } from '@/store/useAuthStore';
import { useRouter } from 'next/router';

// 로그인 기능 : 토큰 반환
const signinUser = async ({ email, password }: signinUserInterface) => {
	const response = await fetch(
		`https://fe-adv-project-together-dallaem.vercel.app/7/auths/signin`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		},
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const data = await response.json();
	const newToken = data.token;
	// 토큰 로컬 스토리지에 저장
	localStorage.setItem('authToken', newToken);
};

// 회원가입 기능
const signupUser = async ({
	email,
	password,
	name,
	companyName,
}: signupUserInterface) => {
	const response = await fetch(
		`https://fe-adv-project-together-dallaem.vercel.app/7/auths/signup`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
				name,
				companyName,
			}),
		},
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const data = await response.json();
	console.log(data);
};

export { signinUser, signupUser };
