import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Login } from './Login';
import { signinUser } from '../../api/userAuth';
import { getUserData } from '@/api/getUserData';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

import '@testing-library/jest-dom';

// Mocking
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
