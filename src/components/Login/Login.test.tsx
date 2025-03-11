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

describe(`로그인: handleBlur 검증`, () => {
	it('입력 없이 창 벗어나면 에러 메시지를 초기화한다', () => {
		render(<Login />);
		const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
		// 입력 필드를 클릭했다가 아무것도 입력하지 않고 벗어남
		fireEvent.focus(emailInput);
		fireEvent.blur(emailInput);
		expect(screen.queryByText('아이디를 입력해주세요')).not.toBeInTheDocument();
		expect(
			screen.queryByText('유효하지 않은 이메일 형식입니다'),
		).not.toBeInTheDocument();
	});

	it('유효하지 않은 이메일이면 에러 메시지를 띄운다', () => {
		render(<Login />);
		const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
		fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
		fireEvent.blur(emailInput);
		// 유효성 검사 실패 → 에러 메시지 표시
		expect(
			screen.getByText('유효하지 않은 이메일 형식입니다'),
		).toBeInTheDocument();
	});

	it('유효한 이메일이면 에러 메시지를 제거한다', () => {
		render(<Login />);
		const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
		fireEvent.change(emailInput, {
			target: { value: 'valid-email@gmail.com' },
		});
		fireEvent.blur(emailInput);
		// 유효성 검사 실패 → 에러 메시지 표시
		expect(screen.queryByText('아이디를 입력해주세요')).not.toBeInTheDocument();
		expect(
			screen.queryByText('유효하지 않은 이메일 형식입니다'),
		).not.toBeInTheDocument();
	});
});

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
