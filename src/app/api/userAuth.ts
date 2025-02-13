import { signinUserInterface, signupUserInterface } from './userInterface';
import { cookies } from 'next/headers';

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
	const token = data.token;
	// 토큰 저장
	localStorage.setItem('authToken', token);
	console.log(data);
};

/* 로그인 반환 예시
  "teamId": "7",
  "userId": 1122,
  "iat": 1739323087,
  "exp": 1739326687
*/

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

export { signinUser };
