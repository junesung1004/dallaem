//로그인 된 유저 데이터 fetch 함수
const getUserData = async () => {
	const token = localStorage.getItem('authToken'); // 저장된 토큰 가져오기
	const tokenExpiryTime = localStorage.getItem('tokenExpiryTime');

	if (!token || !tokenExpiryTime) {
		throw new Error('No token found or token has expired');
	}

	if (Date.now() > parseInt(tokenExpiryTime)) {
		// 토큰이 만료되었으면, 토큰을 삭제하고 로그인 상태를 종료
		localStorage.removeItem('authToken');
		localStorage.removeItem('tokenExpiryTime');
		throw new Error('Token has expired, please login again');
	}

	const response = await fetch(
		`https://fe-adv-project-together-dallaem.vercel.app/7/auths/user`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		},
	);

	if (!response.ok) {
		const error = await response.json();
		console.error(error);
		throw new Error(error.message || 'Unknown error');
	}

	const data = await response.json();
	console.log(data);
};

export { getUserData };
