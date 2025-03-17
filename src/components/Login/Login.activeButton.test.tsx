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

describe('로그인: 버튼 활성화 테스트', () => {
	test('모든 필드가 채워지면 버튼이 활성화된다', () => {
		render(<Login />);

		const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
		const passwordInput =
			screen.getByPlaceholderText('비밀번호를 입력해주세요.');
		const submitButton = screen.getByRole('button', { name: '확인' });

		fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
		fireEvent.change(passwordInput, { target: { value: 'password123' } });

		expect(submitButton).not.toHaveClass('bg-gray-400'); // 비활성화 상태 아님
		expect(submitButton).toHaveClass('bg-primary-600'); // 활성화 상태
	});

	test('오류가 있으면 버튼이 활성화되지 않는다', () => {
		render(<Login />);

		const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
		const passwordInput =
			screen.getByPlaceholderText('비밀번호를 입력해주세요.');
		const submitButton = screen.getByRole('button', { name: '확인' });

		fireEvent.change(emailInput, { target: { value: 'test' } });
		fireEvent.blur(emailInput); // <- 이걸 추가해야 validators.id()가 실행됨
		fireEvent.change(passwordInput, { target: { value: 'password123' } });
		fireEvent.blur(passwordInput); // <- 비밀번호도 blur 필요

		expect(submitButton).toHaveClass('bg-gray-400'); // 비활성화 상태여야 함
		expect(submitButton).not.toHaveClass('bg-primary-600'); // 활성화 상태 아님
	});
});
