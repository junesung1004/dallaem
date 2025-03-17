import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CreateMeetingForm from './CreateMeetingForm';

jest.mock('next/navigation', () => ({
	useRouter: jest.fn(),
}));

describe('CreateMeetingForm', () => {
	it('모임 만들기 폼 컴포넌트 잘 렌더링 되는 가?', () => {
		const queryClient = new QueryClient();

		render(
			<QueryClientProvider client={queryClient}>
				<CreateMeetingForm />
			</QueryClientProvider>,
		);

		// 제목
		expect(screen.getByText('모임 만들기')).toBeInTheDocument();

		// 모임 이름
		expect(screen.getByLabelText('모임 이름')).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText('모임 이름을 작성해주세요'),
		).toBeInTheDocument();

		// 모임 장소
		expect(screen.getByLabelText('장소')).toBeInTheDocument();
		expect(screen.getByText('장소를 선택해주세요'));

		// 모임 이미지
		expect(screen.getByLabelText('이미지')).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText('이미지를 첨부해주세요'),
		).toBeInTheDocument();
	});
});
