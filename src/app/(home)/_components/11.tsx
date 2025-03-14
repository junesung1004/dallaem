import { render, screen, fireEvent, act } from '@testing-library/react';
import HomeButton from './HomeButton';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useGlobalModal } from '@/hooks/customs/useGlobalModal';

// 모킹 설정
jest.mock('next/navigation', () => ({
	useRouter: jest.fn(),
}));

jest.mock('@/store/useAuthStore', () => ({
	useAuthStore: jest.fn(),
}));

jest.mock('@/hooks/customs/useGlobalModal', () => ({
	useGlobalModal: jest.fn(),
}));

const mockPush = jest.fn();
const mockOpenModal = jest.fn();
const mockCloseModal = jest.fn();

(useRouter as jest.Mock).mockImplementation(() => ({
	push: mockPush,
}));

(useGlobalModal as jest.Mock).mockImplementation(() => ({
	openModal: mockOpenModal,
	closeModal: mockCloseModal,
}));

describe('홈 모임 만들기 버튼 컴포넌트', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('모임 만들기 버튼이 잘 렌더링 되는지', () => {
		//모임 만들기 버튼 컴포넌트 렌더링하기
		render(<HomeButton />);

		//버튼 컴포넌트 잘 렌더링 되는지 확인
		const button = screen.getByText('모임 만들기');
		expect(button).toBeInTheDocument();
	});

	it('비로그인시 모달창 생성 후 로그인 페이지 이동', () => {
		// 비로그인 상태 모킹
		(useAuthStore as unknown as jest.Mock).mockImplementation((selector) => {
			return selector({ userId: null });
		});

		render(<HomeButton />);

		const button = screen.getByText('모임 만들기');
		fireEvent.click(button);

		// 모달 호출 검증
		expect(mockOpenModal).toHaveBeenCalledWith({
			content: '로그인이 필요해요',
			confirmType: 'Alert',
			buttonPosition: 'right',
			onConfirm: expect.any(Function),
		});

		// 모달 확인 버튼 클릭 시뮬레이션
		const modalOptions = mockOpenModal.mock.calls[0][0];
		act(() => {
			modalOptions.onConfirm();
		});

		// 라우터 이동 검증
		expect(mockCloseModal).toHaveBeenCalled();
		expect(mockPush).toHaveBeenCalledWith('/login');
	});

	it('로그인 시 모임 만들기 버튼을 누르면 createModal로 이동', () => {
		// 로그인 상태 모킹
		(useAuthStore as unknown as jest.Mock).mockImplementation((selector) => {
			return selector({ userId: 'test-user' });
		});

		render(<HomeButton />);

		const button = screen.getByText('모임 만들기');
		fireEvent.click(button);

		// 라우터 이동 검증
		expect(mockPush).toHaveBeenCalledWith('/createmodal');
	});
});
