import { render, screen } from '@testing-library/react';
import HomeButton from './HomeButton';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { useGlobalModal } from '@/hooks/customs/useGlobalModal';
import { useAuthStore } from '@/store/useAuthStore';

//mock 처리
jest.mock('next/navigation', () => ({
	useRouter: jest.fn(),
}));

jest.mock('@/hooks/customs/useGlobalModal', () => ({
	useGlobalModal: jest.fn(() => ({
		openModal: jest.fn(),
		closeModal: jest.fn(),
	})),
}));

jest.mock('@/store/useAuthStore', () => ({
	useAuthStore: jest.fn(),
}));

describe('홈 모임 만들기 버튼 컴포넌트', () => {
	it('홈 안에 버튼 dom이 잘 렌더링 되는지 test code', () => {
		render(<HomeButton />);

		//버튼 컴포넌트가 잘 렌더링 되는지 확인
		const button = screen.getByText('모임 만들기');
		expect(button).toBeInTheDocument();
	});
});
