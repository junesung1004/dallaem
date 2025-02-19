const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

/** 사용자 정보 수정 / formData 사용 */
export const editProfile = async (data: FormData) => {
	const token = localStorage.getItem('authToken');

	const res = await fetch(`${BASE_URL}auths/user`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: data,
	});

	if (!res.ok) {
		return null;
	}

	return res?.json();
};
