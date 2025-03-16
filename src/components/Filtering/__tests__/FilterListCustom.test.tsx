import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterList from '../FIlterListCustom';
import { FITERING_DATA } from '@/constants';
import type { FilterType } from '@/types/filterType';

jest.mock('../../Calendar/CalendarFilter', () => {
	return function MockCalendarFilter() {
		return <div data-testid='mock-calendar'>Mock Calendar</div>;
	};
});

describe('FilterList', () => {
	const mockHandleFilter = jest.fn();
	const mockFilter: FilterType = {
		location: FITERING_DATA.location[0].value,
		date: '',
		sortBy: FITERING_DATA.sortByMeeting[0].value,
		sortOrder: 'desc',
	};

	const defaultProps = {
		handleFilter: mockHandleFilter,
		filter: mockFilter,
		enabledFilters: [
			'location',
			'date',
			'sortByMeeting',
			'sortByReview',
		] as const,
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('기본 props로 정상적으로 렌더링되는지 테스트', () => {
		render(<FilterList {...defaultProps} />);
		expect(
			screen.getByText(FITERING_DATA.location[0].label),
		).toBeInTheDocument();
	});

	describe('지역 필터', () => {
		it('지역 선택 시 handleFilter가 올바르게 호출되는지 테스트', () => {
			render(<FilterList {...defaultProps} />);
			const locationButton = screen.getByText(FITERING_DATA.location[0].label);
			fireEvent.click(locationButton);

			const locationOption = screen.getByText(FITERING_DATA.location[1].label);
			fireEvent.click(locationOption);

			expect(mockHandleFilter).toHaveBeenCalledWith(
				'location',
				FITERING_DATA.location[1].value,
			);
		});
	});

	describe('날짜 필터', () => {
		it('날짜 필터가 활성화되어 있을 때 캘린더가 렌더링되는지 테스트', () => {
			render(<FilterList {...defaultProps} />);
			const dateButton = screen.getByText('날짜 전체');
			fireEvent.click(dateButton);

			expect(screen.getByTestId('mock-calendar')).toBeInTheDocument();
		});

		it('날짜가 선택되었을 때 선택된 날짜가 표시되는지 테스트', () => {
			const dateFilter = {
				...defaultProps,
				filter: {
					...mockFilter,
					date: '2025-03-14',
				},
			};

			render(<FilterList {...dateFilter} />);
			const formattedDate = screen.getByText('25/03/14');
			expect(formattedDate).toBeInTheDocument();

			// 날짜 버튼 클릭 테스트 추가
			fireEvent.click(formattedDate);
			expect(screen.getByTestId('mock-calendar')).toBeInTheDocument();
		});

		it('날짜 필터 초기화 시 "날짜 전체"가 표시되는지 테스트', () => {
			render(<FilterList {...defaultProps} />);
			expect(screen.getByText('날짜 전체')).toBeInTheDocument();
		});
	});

	describe('정렬 필터', () => {
		it('모임 정렬 필터 변경 시 handleFilter가 올바르게 호출되는지 테스트', () => {
			render(<FilterList {...defaultProps} />);
			const sortButton = screen.getByText(FITERING_DATA.sortByMeeting[0].label);
			fireEvent.click(sortButton);

			const sortOption = screen.getByText(FITERING_DATA.sortByMeeting[1].label);
			fireEvent.click(sortOption);

			expect(mockHandleFilter).toHaveBeenCalledWith(
				'sortBy',
				FITERING_DATA.sortByMeeting[1].value,
			);
		});

		it('모집 마감순 선택 시 자동으로 오름차순으로 변경되는지 테스트', () => {
			render(<FilterList {...defaultProps} />);
			const sortButton = screen.getByText(FITERING_DATA.sortByMeeting[0].label);
			fireEvent.click(sortButton);

			const registrationEndOption = screen.getByText('마감 임박');
			fireEvent.click(registrationEndOption);

			expect(mockHandleFilter).toHaveBeenCalledWith('sortOrder', 'asc');
		});

		it('리뷰 정렬 필터 변경 시 handleFilter가 올바르게 호출되는지 테스트', () => {
			render(
				<FilterList {...defaultProps} enabledFilters={['sortByReview']} />,
			);

			const sortButton = screen.getByText(FITERING_DATA.sortByReview[0].label);
			fireEvent.click(sortButton);

			const reviewOption = screen.getByText(
				FITERING_DATA.sortByReview[1].label,
			);
			fireEvent.click(reviewOption);

			expect(mockHandleFilter).toHaveBeenCalledWith(
				'sortBy',
				FITERING_DATA.sortByReview[1].value,
			);
			expect(mockHandleFilter).toHaveBeenCalledWith('sortOrder', 'desc');
		});
	});

	describe('필터 활성화/비활성화', () => {
		it('비활성화된 필터는 렌더링되지 않는지 테스트', () => {
			render(<FilterList {...defaultProps} enabledFilters={['location']} />);

			expect(screen.queryByText('날짜')).not.toBeInTheDocument();
			expect(
				screen.queryByText(FITERING_DATA.sortByMeeting[0].label),
			).not.toBeInTheDocument();
		});
	});
});
