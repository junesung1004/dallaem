import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';
import '@testing-library/jest-dom';

// Next.js Image 컴포넌트를 단순한 img 태그로 모킹
jest.mock('next/image', () => {
	return function DummyImage(props: any) {
		// props.alt, props.src 등 필요한 속성을 그대로 사용
		return <img {...props} />;
	};
});

describe('Pagination 컴포넌트', () => {
	const onPageChangeMock = jest.fn();

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('totalPages가 2 미만이면 null을 반환해야 한다', () => {
		const { container } = render(
			<Pagination
				currentPage={1}
				totalPages={1}
				onPageChange={onPageChangeMock}
			/>,
		);
		expect(container.firstChild).toBeNull();
	});

	it('여러 페이지가 있을 경우 이전, 페이지 번호, 다음 버튼이 렌더링되어야 한다', () => {
		render(
			<Pagination
				currentPage={2}
				totalPages={5}
				onPageChange={onPageChangeMock}
			/>,
		);

		// 전체 버튼의 수는 "이전 버튼" + "페이지 번호 버튼(총 5개)" + "다음 버튼" = 7개
		const buttons = screen.getAllByRole('button');
		expect(buttons).toHaveLength(7);

		// 페이지 번호 1 ~ 5 버튼이 모두 렌더링되어야 함
		for (let i = 1; i <= 5; i++) {
			expect(screen.getByText(String(i))).toBeInTheDocument();
		}
	});

	it('첫 페이지일 경우 이전 버튼이 비활성화되어야 한다', () => {
		render(
			<Pagination
				currentPage={1}
				totalPages={3}
				onPageChange={onPageChangeMock}
			/>,
		);

		const buttons = screen.getAllByRole('button');
		const prevButton = buttons[0];
		expect(prevButton).toBeDisabled();
	});

	it('마지막 페이지일 경우 다음 버튼이 비활성화되어야 한다', () => {
		render(
			<Pagination
				currentPage={3}
				totalPages={3}
				onPageChange={onPageChangeMock}
			/>,
		);

		const buttons = screen.getAllByRole('button');
		const nextButton = buttons[buttons.length - 1];
		expect(nextButton).toBeDisabled();
	});

	it('페이지 번호 버튼 클릭 시 onPageChange가 해당 번호로 호출되어야 한다', () => {
		render(
			<Pagination
				currentPage={2}
				totalPages={4}
				onPageChange={onPageChangeMock}
			/>,
		);

		const page3Button = screen.getByText('3');
		fireEvent.click(page3Button);
		expect(onPageChangeMock).toHaveBeenCalledWith(3);
	});

	it('이전 및 다음 버튼 클릭 시 onPageChange가 올바른 페이지 번호로 호출되어야 한다', () => {
		render(
			<Pagination
				currentPage={3}
				totalPages={5}
				onPageChange={onPageChangeMock}
			/>,
		);

		const buttons = screen.getAllByRole('button');
		const prevButton = buttons[0];
		const nextButton = buttons[buttons.length - 1];

		// 이전 버튼 클릭 시 currentPage - 1
		fireEvent.click(prevButton);
		expect(onPageChangeMock).toHaveBeenCalledWith(2);

		// 다음 버튼 클릭 시 currentPage + 1
		fireEvent.click(nextButton);
		expect(onPageChangeMock).toHaveBeenCalledWith(4);
	});
});
