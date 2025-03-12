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

describe('로그인: handleFocus 검증', () => {
	test('입력 필드에 포커스 시, 1초 후 유효성 검사 실행', async () => {
		render(<Login />);

		const input = screen.getByPlaceholderText('이메일을 입력해주세요.'); // ID 필드 찾기
		fireEvent.focus(input); // 포커스 이벤트 발생

		expect(screen.queryByText('아이디를 입력해주세요')).not.toBeInTheDocument(); // 아직 에러 메시지가 없어야 함

		act(() => {
			jest.advanceTimersByTime(1000); // 1초 타이머 진행
		});

		expect(
			await screen.findByText('아이디를 입력해주세요'),
		).toBeInTheDocument(); // 유효성 검사 실행 확인
	});
	afterEach(() => {
		jest.clearAllTimers();
		jest.clearAllMocks();
	});
});
