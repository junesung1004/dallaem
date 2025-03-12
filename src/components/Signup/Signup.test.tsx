import { render, screen, fireEvent } from '@testing-library/react';
import { Signup } from './Signup';
import '@testing-library/jest-dom'; // 추가된 부분

jest.mock('next/navigation', () => ({
	useRouter: () => ({
		back: jest.fn(),
	}),
}));

describe('Signup: onBlur 유효성검사 테스트', () => {
	test('유효하지 않은 input에 에러 메시지를 띄운다', () => {
		render(<Signup />);

		const idInput = screen.getByPlaceholderText('아이디를 입력해주세요');

		// 잘못된 값 입력 후 onBlur 실행
		fireEvent.change(idInput, { target: { value: 'invalid-email' } });
		fireEvent.blur(idInput);

		// 에러 메시지가 표시되는지 확인
		expect(
			screen.getByText('유효하지 않은 이메일 형식입니다'),
		).toBeInTheDocument();
	});

	test('올바른 값을 입력하면 에러 메시지가 제거된다', () => {
		render(<Signup />);

		const idInput = screen.getByPlaceholderText('아이디를 입력해주세요');

		// 잘못된 값 입력 후 onBlur 실행 (에러 발생)
		fireEvent.change(idInput, { target: { value: 'invalid-email' } });
		fireEvent.blur(idInput);
		expect(
			screen.getByText('유효하지 않은 이메일 형식입니다'),
		).toBeInTheDocument();

		// 올바른 값 입력 후 onBlur 실행 (에러 제거)
		fireEvent.change(idInput, { target: { value: 'test@example.com' } });
		fireEvent.blur(idInput);
		expect(
			screen.queryByText('유효하지 않은 이메일 형식입니다'),
		).not.toBeInTheDocument();
	});

	test('빈 값일 때 onBlur 실행되더라도 에러 메시지가 표시되지 않는다', () => {
		render(<Signup />);

		const nameInput = screen.getByPlaceholderText('이름을 입력해주세요');
		fireEvent.blur(nameInput);

		expect(screen.queryByText('이름을 입력해주세요')).not.toBeInTheDocument();
	});
});
