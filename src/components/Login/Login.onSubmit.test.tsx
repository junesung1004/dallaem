import {
	render,
	screen,
	fireEvent,
	waitFor,
	act,
} from '@testing-library/react';
import { Login } from './Login';
import * as userAuth from '@/api/userAuth'; // 모듈을 import 합니다.
import * as userDataApi from '@/api/getUserData'; // getUserData 모듈을 import 합니다.

// useAuthStore 모킹
const useAuthStoreMock = {
	setState: jest.fn(),
	email: '',
};

jest.mock('@/store/useAuthStore', () => ({
	useAuthStore: () => useAuthStoreMock,
}));

// jest.mock을 사용하여 getUserData, userAuth, useRouter를 모킹
jest.mock('@/api/userAuth.ts');
jest.mock('@/api/getUserData.ts');

jest.mock('next/navigation', () => ({
	useRouter() {
		return {
			prefetch: () => null,
			back: jest.fn(),
		};
	},
}));

describe('handleSubmit', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		localStorage.setItem('authToken', 'test-token');

		// getUserData, signinUser 모듈에서 해당 함수들을 spyOn으로 감시
		jest.spyOn(userAuth, 'signinUser').mockResolvedValueOnce(undefined);

		jest.spyOn(userDataApi, 'getUserData').mockResolvedValueOnce({
			id: 1111,
			companyName: 'test',
			name: 'test',
			email: 'test@example.com',
			image: '',
			teamId: 7,
			createdAt: '',
			updatedAt: '',
		});
	});

	it('제출 성공 및 상태관리변수 업데이트가 되어야 한다', async () => {
		render(<Login />);

		fireEvent.change(screen.getByPlaceholderText('이메일을 입력해주세요.'), {
			target: { value: 'test@example.com' },
		});
		fireEvent.change(screen.getByPlaceholderText('비밀번호를 입력해주세요.'), {
			target: { value: 'password123' },
		});

		await act(async () => {
			fireEvent.click(screen.getByText('확인'));
		});

		await waitFor(() => {
			expect(userAuth.signinUser).toHaveBeenCalledWith({
				email: 'test@example.com',
				password: 'password123',
			});
			expect(userDataApi.getUserData).toHaveBeenCalled();
			expect(useAuthStoreMock.setState).toHaveBeenCalledWith({
				isLoggedIn: true,
				token: 'test-token',
				userId: 1111,
				companyName: 'test',
				name: 'test',
				email: 'test@example.com',
				image: '',
			}); //useAuthStoreMock.setState로 명확히 지정해줘야 call 집계됨
		});
	});
});
