import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Signup } from './Signup';

// useRouter를 모킹
jest.mock('next/navigation', () => ({
	useRouter: () => ({
		back: jest.fn(), // router.back()을 모킹
	}),
}));

jest.useFakeTimers(); // 타이머를 가짜로 만들어 시간 관련 동작을 제어

describe('회원가입: onBlur 테스트', () => {
	test('유효하지 않은 input에 에러 메시지를 띄운다', () => {
		render(<Signup />);

		const idInput = screen.getByPlaceholderText('아이디를 입력해주세요');
		const companyNameInput =
			screen.getByPlaceholderText('회사명을 입력해주세요');
		const passwordInput =
			screen.getByPlaceholderText('비밀번호를 입력해주세요');
		const passwordConfirmInput = screen.getByPlaceholderText(
			'비밀번호를 다시 한 번 입력해주세요',
		);

		// 입력 후 onBlur 실행
		fireEvent.change(idInput, { target: { value: 'invalid-email' } });
		fireEvent.change(companyNameInput, { target: { value: 'in' } });
		fireEvent.change(passwordInput, { target: { value: 'invalid' } });
		fireEvent.change(passwordConfirmInput, { target: { value: 'invalid2' } });
		fireEvent.blur(idInput);
		fireEvent.blur(companyNameInput);
		fireEvent.blur(passwordInput);
		fireEvent.blur(passwordConfirmInput);

		// 에러 메시지가 표시되는지 확인
		expect(
			screen.getByText('유효하지 않은 이메일 형식입니다'),
		).toBeInTheDocument();

		expect(
			screen.getByText('회사명은 3자 이상, 12자 이하여야 합니다'),
		).toBeInTheDocument();

		expect(
			screen.getByText('비밀번호는 최소 8자 이상이어야 합니다'),
		).toBeInTheDocument();

		expect(
			screen.getByText('비밀번호가 일치하지 않습니다.'),
		).toBeInTheDocument();
	});

	test('다시 유효한 입력이 들어오면 에러메시지를 삭제한다', () => {
		render(<Signup />);

		const idInput = screen.getByPlaceholderText('아이디를 입력해주세요');
		const companyNameInput =
			screen.getByPlaceholderText('회사명을 입력해주세요');
		const passwordInput =
			screen.getByPlaceholderText('비밀번호를 입력해주세요');
		const passwordConfirmInput = screen.getByPlaceholderText(
			'비밀번호를 다시 한 번 입력해주세요',
		);

		/* ID */
		// 잘못된 입력 후 blur 실행 (에러 발생)
		fireEvent.change(idInput, { target: { value: 'invalid-email' } });
		fireEvent.blur(idInput);
		expect(
			screen.getByText('유효하지 않은 이메일 형식입니다'),
		).toBeInTheDocument();
		// 올바른 입력 후 blur 실행 (에러 제거)
		fireEvent.change(idInput, { target: { value: 'test@example.com' } });
		fireEvent.blur(idInput);
		expect(
			screen.queryByText('유효하지 않은 이메일 형식입니다'),
		).not.toBeInTheDocument();

		/* Company Name */
		fireEvent.change(companyNameInput, { target: { value: 'in' } });
		fireEvent.blur(companyNameInput);
		expect(
			screen.getByText('회사명은 3자 이상, 12자 이하여야 합니다'),
		).toBeInTheDocument();

		fireEvent.change(companyNameInput, { target: { value: 'valid' } });
		fireEvent.blur(companyNameInput);
		expect(
			screen.queryByText('회사명은 3자 이상, 12자 이하여야 합니다'),
		).not.toBeInTheDocument();

		/* Password */
		fireEvent.change(passwordInput, { target: { value: 'invalid' } });
		fireEvent.blur(passwordInput);
		expect(
			screen.getByText('비밀번호는 최소 8자 이상이어야 합니다'),
		).toBeInTheDocument();

		fireEvent.change(passwordInput, { target: { value: 'validPassword' } });
		fireEvent.blur(passwordInput);
		expect(
			screen.queryByText('비밀번호는 최소 8자 이상이어야 합니다'),
		).not.toBeInTheDocument();

		/* PasswordConfirm */
		fireEvent.change(passwordConfirmInput, {
			target: { value: 'invalid3332' },
		});
		fireEvent.blur(passwordConfirmInput);
		expect(
			screen.getByText('비밀번호가 일치하지 않습니다.'),
		).toBeInTheDocument();

		fireEvent.change(passwordConfirmInput, {
			target: { value: 'validPassword' },
		});
		fireEvent.blur(passwordConfirmInput);
		expect(
			screen.queryByText('비밀번호가 일치하지 않습니다.'),
		).not.toBeInTheDocument();
	});

	test('인풋이 비어있으면 에러메시지를 제거한다', () => {
		render(<Signup />);

		const nameInput = screen.getByPlaceholderText('이름을 입력해주세요');
		fireEvent.blur(nameInput);

		expect(screen.queryByText('이름을 입력해주세요')).not.toBeInTheDocument();
	});
});

describe('회원가입: onBlur 테스트', () => {
	test('이름: 포커스를 받은 후 0.5초 후에 빈값이면 에러 메시지가 표시된다', async () => {
		render(<Signup />);
		const nameInput = screen.getByPlaceholderText('이름을 입력해주세요');
		// onFocus 이벤트 발생
		fireEvent.focus(nameInput);
		// 0.5초 동안 타이머 진행
		act(() => {
			jest.advanceTimersByTime(500);
		});

		// 에러 메시지가 나타나는지 확인
		expect(await screen.findByText('이름을 입력해주세요')).toBeInTheDocument();
	});

	test('회사명: 포커스를 받은 후 0.5초 후에 빈값이면 에러 메시지가 표시된다', async () => {
		render(<Signup />);
		const companyNameInput =
			screen.getByPlaceholderText('회사명을 입력해주세요');
		// onFocus 이벤트 발생
		fireEvent.focus(companyNameInput);
		// 0.5초 동안 타이머 진행
		act(() => {
			jest.advanceTimersByTime(500);
		});

		// 에러 메시지가 나타나는지 확인
		expect(
			await screen.findByText('회사명을 입력해주세요'),
		).toBeInTheDocument();
	});

	test('비밀번호: 포커스를 받은 후 0.5초 후에 빈값이면 에러 메시지가 표시된다', async () => {
		render(<Signup />);

		const passwordInput =
			screen.getByPlaceholderText('비밀번호를 입력해주세요');
		fireEvent.focus(passwordInput);

		// 0.5초 동안 타이머 진행
		act(() => {
			jest.advanceTimersByTime(500);
		});

		// 에러 메시지가 나타나는지 확인

		expect(
			await screen.getByText('비밀번호를 입력해주세요'),
		).toBeInTheDocument();
	});

	test('비밀번호 확인: 포커스를 받은 후 0.5초 후에 빈값이면 에러 메시지가 표시된다', async () => {
		render(<Signup />);

		const passwordConfirmInput = screen.getByPlaceholderText(
			'비밀번호를 다시 한 번 입력해주세요',
		);
		// onFocus 이벤트 발생

		fireEvent.focus(passwordConfirmInput);

		// 0.5초 동안 타이머 진행
		act(() => {
			jest.advanceTimersByTime(500);
		});

		// 에러 메시지가 나타나는지 확인
		expect(
			await screen.getByText('비밀번호를 다시 한 번 입력해주세요'),
		).toBeInTheDocument();
	});

	test('포커스를 받은 후 0.5초 내로 입력하면 에러메시지가 표시되지 않는다', async () => {
		render(<Signup />);

		const nameInput = screen.getByPlaceholderText('이름을 입력해주세요');

		// onFocus 이벤트 발생
		fireEvent.focus(nameInput);

		// 300ms 타이머 진행
		act(() => {
			jest.advanceTimersByTime(300);
		});
		fireEvent.change(nameInput, { target: { value: 'test@example.com' } });

		// 비동기적으로 에러 메시지가 표시되지 않는지 확인
		expect(
			await screen.queryByText('이름을 입력해주세요'), //find가 아닌 query를 써야함. find는 비동기라 1초까지 기다리며 오류 메시지를 반환할 수도 있음
		).not.toBeInTheDocument();
	});

	test('에러메시지가 표시되었다가 다시 입력하면 에러메시지가 사라진다', async () => {
		render(<Signup />);

		const nameInput = screen.getByPlaceholderText('이름을 입력해주세요');

		// onFocus 이벤트 발생
		fireEvent.focus(nameInput);

		// 500ms 타이머 진행
		act(() => {
			jest.advanceTimersByTime(500);
		});
		// 비동기적으로 에러 메시지가 표시되는지 확인
		expect(await screen.findByText('이름을 입력해주세요')).toBeInTheDocument();

		// 300ms 타이머 진행
		act(() => {
			jest.advanceTimersByTime(300);
		});
		fireEvent.change(nameInput, { target: { value: 'test@example.com' } });

		// 비동기적으로 에러 메시지가 표시되지 않는지 확인
		expect(
			await screen.queryByText('이름을 입력해주세요'), //find가 아닌 query를 써야함. find는 비동기라 1초까지 기다리며 오류 메시지를 반환할 수도 있음
		).not.toBeInTheDocument();
	});
});
