import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Signup } from './Signup';

// useRouter를 모킹
jest.mock('next/navigation', () => ({
	useRouter: () => ({
		back: jest.fn(), // router.back()을 모킹
	}),
}));

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
