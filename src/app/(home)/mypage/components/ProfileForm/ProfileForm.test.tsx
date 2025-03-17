import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { editProfile } from '@/api/users';
import ProfileForm from './ProfileForm';
import { useProfile, useProfileActions } from '@/store/useAuthStore';

// Mock 함수 설정
jest.mock('@/store/useAuthStore');
jest.mock('@/store/useAuthStore');
jest.mock('next/navigation', () => ({
	useRouter: jest.fn(),
}));
jest.mock('@/api/users');

describe('ProfileForm Component', () => {
	let mockRouterBack: jest.Mock;
	let setImage: jest.Mock;
	let setCompanyName: jest.Mock;

	beforeEach(() => {
		mockRouterBack = jest.fn();
		setImage = jest.fn();
		setCompanyName = jest.fn();

		(useRouter as jest.Mock).mockReturnValue({ back: mockRouterBack });
		(useProfile as jest.Mock).mockReturnValue({
			image: '/profile.jpg',
			companyName: 'Test Company',
			email: 'test@example.com',
		});
		(useProfileActions as jest.Mock).mockReturnValue({
			setImage,
			setCompanyName,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	// 1. 초기 렌더링 테스트
	test('초기 상태가 올바르게 설정되는지 확인', async () => {
		render(<ProfileForm />);

		const companyElement = await screen.findByDisplayValue('Test Company');
		const emailElement = await screen.findByDisplayValue('test@example.com');

		expect(companyElement).toBeInTheDocument();
		expect(emailElement).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /수정 하기/i })).toBeEnabled();
	});

	// 2. 입력값 변경 테스트
	test('입력 필드 값이 변경될 때 상태가 업데이트되는지 확인', () => {
		render(<ProfileForm />);
		const companyInput = screen.getByLabelText(/회사/i) as HTMLInputElement;

		fireEvent.change(companyInput, { target: { value: '' } });
		expect(companyInput.value).toBe('');
		expect(screen.getByRole('button', { name: /수정 하기/i })).toBeDisabled();

		fireEvent.change(companyInput, { target: { value: 'New Company' } });
		expect(companyInput.value).toBe('New Company');
		expect(screen.getByRole('button', { name: /수정 하기/i })).toBeEnabled();
	});

	// 3. 이메일 필드가 변경되지 않는지 확인
	test('이메일 입력 필드가 읽기 전용인지 확인', async () => {
		render(<ProfileForm />);
		const emailInput = await screen.findByLabelText(/이메일/i);

		expect(emailInput).toBeDisabled();
		expect(emailInput).toHaveAttribute('readonly');
	});

	// 4. 폼 제출 테스트
	test('폼 제출 시 editProfile 호출 및 상태 업데이트 확인', async () => {
		(editProfile as jest.Mock).mockResolvedValue({
			image: '/updated.jpg',
			companyName: 'Updated Company',
		});

		render(<ProfileForm />);
		const form = screen.getByRole('form');
		fireEvent.submit(form);

		await waitFor(() => {
			expect(editProfile).toHaveBeenCalled();
			expect(setImage).toHaveBeenCalledWith('/updated.jpg');
			expect(setCompanyName).toHaveBeenCalledWith('Updated Company');
			expect(mockRouterBack).toHaveBeenCalled();
		});
	});

	// 5. 취소 버튼 클릭 테스트
	test('취소 버튼 클릭 시 router.back() 호출 확인', () => {
		render(<ProfileForm />);
		const cancelButton = screen.getByRole('button', { name: /취소/i });

		fireEvent.click(cancelButton);
		expect(mockRouterBack).toHaveBeenCalled();
	});
});
