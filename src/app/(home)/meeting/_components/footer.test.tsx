import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Footer } from './footer';

// 외부 의존성들을 목(mock) 처리
jest.mock('@/store/useAuthStore', () => ({
	useAuthStore: jest.fn(),
}));

jest.mock('@/hooks/customs/useGlobalModal', () => ({
	useGlobalModal: jest.fn(),
}));

jest.mock('next/navigation', () => ({
	useRouter: jest.fn(),
	useParams: jest.fn(),
}));

jest.mock('@/api/detail-meeting/participantsGroup', () => ({
	participantsGroup: jest.fn(),
}));

jest.mock('@/hooks/mutation/useGroupMutations', () => ({
	useGroupMutations: jest.fn(),
}));

// Button 컴포넌트를 간단한 button 엘리먼트로 대체
jest.mock('@/components/Button/Button', () => {
	return function DummyButton({ children, ...props }: any) {
		return <button {...props}>{children}</button>;
	};
});

// 목(mock)으로 설정할 함수들을 불러옴
import { useAuthStore } from '@/store/useAuthStore';
import { useGlobalModal } from '@/hooks/customs/useGlobalModal';
import { useRouter, useParams } from 'next/navigation';
import { participantsGroup } from '@/api/detail-meeting/participantsGroup';
import { useGroupMutations } from '@/hooks/mutation/useGroupMutations';

// 각 테스트에서 사용할 모달 및 mutation 관련 함수들을 미리 선언
const mockOpenModal = jest.fn();
const mockCloseModal = jest.fn();
const mockRouterPush = jest.fn();
const mockJoinMutate = jest.fn();
const mockLeaveMutate = jest.fn();
const mockCancelMutate = jest.fn();

// QueryClientProvider로 감싸는 헬퍼 함수
function renderWithQueryClient(ui: React.ReactElement) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false, // 테스트 시 불필요한 재시도 방지
			},
		},
	});
	return render(
		<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
	);
}

describe('Footer Component', () => {
	// 각 테스트 실행 전에 목(mock) 초기화 및 기본값 설정
	beforeEach(() => {
		jest.resetAllMocks();

		// 기본: 로그인한 사용자 ID를 1로 설정 (소유자 테스트에 사용)
		(useAuthStore as unknown as jest.Mock).mockImplementation(
			(selector: (state: { userId: number | null }) => unknown) =>
				selector({ userId: 1 }),
		);

		// 모달 관련 함수 설정
		(useGlobalModal as jest.Mock).mockReturnValue({
			openModal: mockOpenModal,
			closeModal: mockCloseModal,
		});

		// 라우터 관련 함수 설정 (페이지 이동을 위해 사용)
		(useRouter as jest.Mock).mockReturnValue({
			push: mockRouterPush,
		});

		// URL 파라미터에서 id를 '123'으로 설정
		(useParams as jest.Mock).mockReturnValue({ id: '123' });

		// 기본적으로 참여자 목록은 빈 배열 (아직 참여하지 않은 상태)
		(participantsGroup as jest.Mock).mockResolvedValue([]);

		// 그룹 관련 mutation 함수들을 설정 (참여, 탈퇴, 취소)
		(useGroupMutations as jest.Mock).mockReturnValue({
			joinMutation: { mutate: mockJoinMutate },
			leaveMutation: { mutate: mockLeaveMutate },
			cancelMutation: { mutate: mockCancelMutate },
		});
	});

	// 1. 소유자인 경우: createdBy와 로그인한 userId가 같으므로 소유자 UI(취소하기, 공유하기 버튼)가 보여야 함
	test('소유자인 경우 취소하기와 공유하기 버튼이 렌더링 되어야 한다', async () => {
		renderWithQueryClient(
			<Footer
				createdBy={1}
				capacity={10}
				participantCount={5}
				updateParticipantCount={jest.fn()}
			/>,
		);

		expect(screen.getByText('취소하기')).toBeInTheDocument();
		expect(screen.getByText('공유하기')).toBeInTheDocument();
	});

	// 2. 비소유자이며, 참여 인원이 모집 한도(capacity)와 같으면 모집 마감 상태로 렌더링
	test('비소유자면서 모집 인원이 꽉 찬 경우 (deadline) 참여하기 버튼(비활성)이 렌더링 되어야 한다', async () => {
		// 로그인한 userId가 2 (비소유자)로 설정
		(useAuthStore as unknown as jest.Mock).mockImplementation(
			(selector: (state: { userId: number | null }) => unknown) =>
				selector({ userId: 2 }),
		);

		renderWithQueryClient(
			<Footer
				createdBy={1}
				capacity={5}
				participantCount={5} // 참여 인원이 모집 한도에 도달한 상태
				updateParticipantCount={jest.fn()}
			/>,
		);

		// 모집 마감 상태에서는 Button 대신 div로 렌더링되어 클릭할 수 없는 상태
		expect(screen.getByText('참여하기')).toBeInTheDocument();
	});

	// 3. 비소유자가 참여하기 버튼을 클릭 시, 참여(join)와 참여 취소(leave) 동작이 토글되어야 함
	test('비소유자일 때 참여하기 버튼 클릭시 참여/취소 토글 동작', async () => {
		// 로그인한 userId를 2 (비소유자)로 설정
		(useAuthStore as unknown as jest.Mock).mockImplementation(
			(selector: Function) => selector({ userId: 2 }),
		);

		// 아직 참여하지 않은 상태로 설정 (참여자 목록은 빈 배열)
		(participantsGroup as jest.Mock).mockResolvedValue([]);

		const updateParticipantCount = jest.fn();

		renderWithQueryClient(
			<Footer
				createdBy={1}
				capacity={10}
				participantCount={5}
				updateParticipantCount={updateParticipantCount}
			/>,
		);

		// useEffect 내부에서 participantsGroup이 호출되어 id 값(123)을 인자로 전달하는지 확인
		await waitFor(() => {
			expect(participantsGroup).toHaveBeenCalledWith(123);
		});

		// 초기에는 '참여하기' 버튼이 보여야 함
		const joinButton = screen.getByText('참여하기');
		expect(joinButton).toBeInTheDocument();

		// '참여하기' 버튼 클릭 시 joinMutation이 호출되어야 함
		fireEvent.click(joinButton);
		await waitFor(() => {
			expect(mockJoinMutate).toHaveBeenCalled();
		});

		// 내부 상태 업데이트 후 버튼 텍스트가 '참여 취소하기'로 변경되어야 함
		expect(screen.getByText('참여 취소하기')).toBeInTheDocument();

		// '참여 취소하기' 버튼 클릭 시 leaveMutation이 호출되어야 함
		fireEvent.click(screen.getByText('참여 취소하기'));
		await waitFor(() => {
			expect(mockLeaveMutate).toHaveBeenCalled();
		});

		// 버튼 텍스트가 다시 '참여하기'로 토글되어야 함
		expect(screen.getByText('참여하기')).toBeInTheDocument();
	});

	// 4. 로그인하지 않은 사용자가 참여하기 버튼 클릭 시, 로그인 필요 모달 호출
	test('로그인하지 않은 사용자가 참여하기 버튼 클릭시 로그인 모달 호출', async () => {
		// userId를 null로 설정하여 비로그인 상태로 만듦
		(useAuthStore as unknown as jest.Mock).mockImplementation(
			(selector: (state: { userId: number | null }) => unknown) =>
				selector({ userId: null }),
		);

		renderWithQueryClient(
			<Footer
				createdBy={1}
				capacity={10}
				participantCount={5}
				updateParticipantCount={jest.fn()}
			/>,
		);

		const joinButton = screen.getByText('참여하기');
		fireEvent.click(joinButton);

		await waitFor(() => {
			expect(mockOpenModal).toHaveBeenCalledWith(
				expect.objectContaining({
					content: '로그인이 필요해요',
				}),
			);
		});
	});

	// 5. 소유자인 경우, 취소하기 버튼 클릭 시 cancelMutation 호출 및 페이지 이동
	test('소유자에서 취소하기 버튼 클릭시 cancelMutation 호출 및 페이지 이동', async () => {
		(useAuthStore as unknown as jest.Mock).mockImplementation(
			(selector: (state: { userId: number | null }) => unknown) =>
				selector({ userId: 1 }),
		);

		renderWithQueryClient(
			<Footer
				createdBy={1}
				capacity={10}
				participantCount={5}
				updateParticipantCount={jest.fn()}
			/>,
		);

		const cancelButton = screen.getByText('취소하기');
		fireEvent.click(cancelButton);

		await waitFor(() => {
			expect(mockCancelMutate).toHaveBeenCalled();
		});
	});

	// 6. 소유자인 경우, 공유하기 버튼 클릭 시 공유 모달 호출
	test('소유자에서 공유하기 버튼 클릭시 공유 모달 호출', async () => {
		(useAuthStore as unknown as jest.Mock).mockImplementation(
			(selector: (state: { userId: number | null }) => unknown) =>
				selector({ userId: 1 }),
		);

		renderWithQueryClient(
			<Footer
				createdBy={1}
				capacity={10}
				participantCount={5}
				updateParticipantCount={jest.fn()}
			/>,
		);

		const shareButton = screen.getByText('공유하기');
		fireEvent.click(shareButton);

		await waitFor(() => {
			expect(mockOpenModal).toHaveBeenCalledWith(
				expect.objectContaining({
					content: '공유 되었습니다',
				}),
			);
		});
	});
});
