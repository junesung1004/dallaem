import { render, screen, fireEvent, act } from '@testing-library/react';
import { Login } from './Login';
import '@testing-library/jest-dom';

// Mocking
jest.useFakeTimers(); // 가짜 타이머 사용

jest.mock('@/api/userAuth', () => ({
	signinUser: jest.fn(),
}));
jest.mock('@/api/getUserData', () => ({
	getUserData: jest.fn(),
}));
jest.mock('next/navigation', () => ({
	useRouter: jest.fn(),
}));
jest.mock('@/store/useAuthStore', () => ({
	useAuthStore: jest.fn().mockReturnValue({
		setUserId: jest.fn(),
		setToken: jest.fn(),
		setIsLoggedIn: jest.fn(),
	}),
}));

describe('로그인: hideToggleButton 테스트', () => {
	test('비밀번호 숨기기 버튼을 클릭하면 입력 타입이 변경된다', () => {
		render(<Login />);

		const passwordInput =
			screen.getByPlaceholderText('비밀번호를 입력해주세요.');
		const toggleButton = screen.getByRole('button', {
			name: '비밀번호 표시/숨기기',
		});

		expect(passwordInput).toHaveAttribute('type', 'password');

		fireEvent.click(toggleButton);
		expect(passwordInput).toHaveAttribute('type', 'text');

		fireEvent.click(toggleButton);
		expect(passwordInput).toHaveAttribute('type', 'password');
	});
});
