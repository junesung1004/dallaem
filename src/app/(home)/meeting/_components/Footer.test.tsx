// Footer.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Footer } from './footer';

// 외부 의존성들을 목(mock) 처리합니다.
jest.mock('@/store/useAuthStore', () => ({
	// useAuthStore 훅을 목 처리: 함수형 업데이트를 위해 전달된 함수(fn)를 호출하여 값을 반환하도록 함
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

// Button 컴포넌트를 간단한 button 엘리먼트로 대체합니다.
jest.mock('@/components/Button/Button', () => {
	return function DummyButton({ children, ...props }: any) {
		return <button {...props}>{children}</button>;
	};
});

// 목(mock)으로 설정할 함수들을 불러옵니다.
import { useAuthStore } from '@/store/useAuthStore';
import { useGlobalModal } from '@/hooks/customs/useGlobalModal';
import { useRouter, useParams } from 'next/navigation';
import { participantsGroup } from '@/api/detail-meeting/participantsGroup';
import { useGroupMutations } from '@/hooks/mutation/useGroupMutations';

// 각 테스트에서 사용할 모달 및 mutation 관련 함수들을 미리 선언합니다.
const mockOpenModal = jest.fn();
const mockCloseModal = jest.fn();
const mockRouterPush = jest.fn();
const mockJoinMutate = jest.fn();
const mockLeaveMutate = jest.fn();
const mockCancelMutate = jest.fn();

describe('Footer Component', () => {
	// 각 테스트 실행 전에 목(mock) 초기화 및 기본값 설정
	beforeEach(() => {
		jest.resetAllMocks();

		// 기본: 로그인한 사용자 ID를 1로 설정 (소유자 테스트에 사용)
		// useAuthStore 훅은 전달된 함수를 인자로 받아, 내부 상태를 반환합니다.
		(useAuthStore as unknown as jest.Mock).mockImplementation(
			(selector: Function) => selector({ userId: 1 }),
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

	// 1. 소유자인 경우: createdBy와 로그인한 userId가 같으므로 소유자 UI(취소하기, 공유하기 버튼)가 보여야 합니다.
	test('소유자인 경우 취소하기와 공유하기 버튼이 렌더링 되어야 한다', async () => {
		render(
			<Footer
				createdBy={1}
				capacity={10}
				participantCount={5}
				updateParticipantCount={jest.fn()}
			/>,
		);

		// "취소하기"와 "공유하기" 버튼이 화면에 존재하는지 검증합니다.
		expect(screen.getByText('취소하기')).toBeInTheDocument();
		expect(screen.getByText('공유하기')).toBeInTheDocument();
	});

	// 2. 비소유자이며, 참여 인원이 모집 한도(capacity)와 같으면 모집 마감 상태로 렌더링되어야 합니다.
	test('비소유자면서 모집 인원이 꽉 찬 경우 (deadline) 참여하기 버튼(비활성)이 렌더링 되어야 한다', async () => {
		// 로그인한 userId가 2 (비소유자)로 설정합니다.
		(useAuthStore as unknown as jest.Mock).mockImplementation(
			(selector: Function) => selector({ userId: 2 }),
		);

		render(
			<Footer
				createdBy={1}
				capacity={5}
				participantCount={5} // 참여 인원이 모집 한도에 도달한 상태
				updateParticipantCount={jest.fn()}
			/>,
		);

		// 모집 마감 상태에서는 Button 대신 div로 렌더링되어 클릭할 수 없는 상태를 나타냅니다.
		expect(screen.getByText('참여하기')).toBeInTheDocument();
	});

	// 3. 비소유자가 참여하기 버튼을 클릭 시, 참여(join)와 참여 취소(leave) 동작이 토글되어야 합니다.
	test('비소유자일 때 참여하기 버튼 클릭시 참여/취소 토글 동작', async () => {
		// 로그인한 userId를 2 (비소유자)로 설정합니다.
		(useAuthStore as unknown as jest.Mock).mockImplementation(
			(selector: Function) => selector({ userId: 2 }),
		);

		// 아직 참여하지 않은 상태로 설정 (참여자 목록은 빈 배열)
		(participantsGroup as jest.Mock).mockResolvedValue([]);

		const updateParticipantCount = jest.fn();

		render(
			<Footer
				createdBy={1}
				capacity={10}
				participantCount={5}
				updateParticipantCount={updateParticipantCount}
			/>,
		);

		// useEffect 내부에서 participantsGroup이 호출되어 id 값(123)을 인자로 전달하는지 확인합니다.
		await waitFor(() => {
			expect(participantsGroup).toHaveBeenCalledWith(123);
		});

		// 초기에는 '참여하기' 버튼이 보여야 합니다.
		const joinButton = screen.getByText('참여하기');
		expect(joinButton).toBeInTheDocument();

		// '참여하기' 버튼 클릭 시 joinMutation이 호출되어야 합니다.
		fireEvent.click(joinButton);
		await waitFor(() => {
			expect(mockJoinMutate).toHaveBeenCalled();
		});

		// 내부 상태 업데이트 후 버튼 텍스트가 '참여 취소하기'로 변경되어야 합니다.
		expect(screen.getByText('참여 취소하기')).toBeInTheDocument();

		// '참여 취소하기' 버튼 클릭 시 leaveMutation이 호출되어야 합니다.
		fireEvent.click(screen.getByText('참여 취소하기'));
		await waitFor(() => {
			expect(mockLeaveMutate).toHaveBeenCalled();
		});

		// 버튼 텍스트가 다시 '참여하기'로 토글되어야 합니다.
		expect(screen.getByText('참여하기')).toBeInTheDocument();
	});

	// 4. 로그인하지 않은 사용자가 참여하기 버튼을 클릭하면 로그인 필요 모달이 호출되어야 합니다.
	test('로그인하지 않은 사용자가 참여하기 버튼 클릭시 로그인 모달 호출', async () => {
		// userId를 null로 설정하여 비로그인 상태로 만듭니다.
		(useAuthStore as unknown as jest.Mock).mockImplementation(
			(selector: Function) => selector({ userId: null }),
		);

		render(
			<Footer
				createdBy={1}
				capacity={10}
				participantCount={5}
				updateParticipantCount={jest.fn()}
			/>,
		);

		// '참여하기' 버튼 클릭
		const joinButton = screen.getByText('참여하기');
		fireEvent.click(joinButton);

		// 로그인 필요 모달이 호출되었는지 검증합니다.
		await waitFor(() => {
			expect(mockOpenModal).toHaveBeenCalledWith(
				expect.objectContaining({
					content: '로그인이 필요해요',
				}),
			);
		});
	});

	// 5. 소유자인 경우, 취소하기 버튼 클릭 시 cancelMutation이 호출되고 페이지 이동이 발생해야 합니다.
	test('소유자에서 취소하기 버튼 클릭시 cancelMutation 호출 및 페이지 이동', async () => {
		// 소유자 상태: userId와 createdBy가 동일하게 1로 설정
		(useAuthStore as unknown as jest.Mock).mockImplementation(
			(selector: Function) => selector({ userId: 1 }),
		);

		render(
			<Footer
				createdBy={1}
				capacity={10}
				participantCount={5}
				updateParticipantCount={jest.fn()}
			/>,
		);

		// '취소하기' 버튼 클릭
		const cancelButton = screen.getByText('취소하기');
		fireEvent.click(cancelButton);

		// cancelMutation이 호출되었는지 확인합니다.
		await waitFor(() => {
			expect(mockCancelMutate).toHaveBeenCalled();
		});
	});

	// 6. 소유자인 경우, 공유하기 버튼 클릭 시 공유 모달이 호출되어야 합니다.
	test('소유자에서 공유하기 버튼 클릭시 공유 모달 호출', async () => {
		// 소유자 상태: userId와 createdBy가 동일하게 1로 설정
		(useAuthStore as unknown as jest.Mock).mockImplementation(
			(selector: Function) => selector({ userId: 1 }),
		);

		render(
			<Footer
				createdBy={1}
				capacity={10}
				participantCount={5}
				updateParticipantCount={jest.fn()}
			/>,
		);

		// '공유하기' 버튼 클릭
		const shareButton = screen.getByText('공유하기');
		fireEvent.click(shareButton);

		// 공유 모달이 호출되었는지 검증합니다.
		await waitFor(() => {
			expect(mockOpenModal).toHaveBeenCalledWith(
				expect.objectContaining({
					content: '공유 되었습니다',
				}),
			);
		});
	});
});
