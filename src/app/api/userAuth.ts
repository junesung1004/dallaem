import { signinUserInterface, signupUserInterface } from './userInterface';

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
	// 토큰 만료 시간을 1시간으로 설정 (현재 시간 + 1시간)
	const expiryTime = Date.now() + 60 * 60 * 1000;
	// 토큰 저장
	localStorage.setItem('authToken', token);
	localStorage.setItem('tokenExpiryTime', expiryTime.toString()); // 만료 시간 저장
	console.log(data);
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
				email: { email },
				password: { password },
				name: { name },
				companyName: { companyName },
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
