import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterDropdown from '../FilterDropdown';
import { FITERING_DATA } from '@/constants';

describe('FilterDropdown', () => {
	const mockOnSelect = jest.fn();
	const mockOnToggle = jest.fn();

	const defaultProps = {
		category: 'location' as keyof typeof FITERING_DATA,
		selected: FITERING_DATA.location[0].value,
		onSelect: mockOnSelect,
		isOpen: false,
		onToggle: mockOnToggle,
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('기본 props로 정상적으로 렌더링되는지 테스트', () => {
		render(<FilterDropdown {...defaultProps} />);
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('isOpen이 true일 때 드롭다운 메뉴가 표시되는지 테스트', () => {
		render(<FilterDropdown {...defaultProps} isOpen={true} />);
		expect(
			screen.getByText(FITERING_DATA.location[1].label),
		).toBeInTheDocument();
	});

	it('버튼 클릭 시 onToggle이 호출되는지 테스트', () => {
		render(<FilterDropdown {...defaultProps} />);
		fireEvent.click(screen.getByRole('button'));
		expect(mockOnToggle).toHaveBeenCalled();
	});

	it('옵션 선택 시 올바른 값으로 onSelect가 호출되는지 테스트', () => {
		render(<FilterDropdown {...defaultProps} isOpen={true} />);
		fireEvent.click(screen.getByText(FITERING_DATA.location[1].label));
		expect(mockOnSelect).toHaveBeenCalledWith(
			FITERING_DATA.location[1].value,
			'asc',
		);
	});

	describe('sort', () => {
		const sortProps = {
			...defaultProps,
			variant: 'sort' as const,
			category: 'sortByMeeting' as keyof typeof FITERING_DATA,
			sortOrder: 'asc' as const,
			selected: FITERING_DATA.sortByMeeting[0].value,
		};

		it('sort variant일 때 정렬 아이콘이 렌더링되는지 테스트', () => {
			render(<FilterDropdown {...sortProps} />);
			expect(screen.getByAltText('asc')).toBeInTheDocument();
		});

		it('정렬 아이콘 클릭 시 정렬 순서가 토글되는지 테스트', () => {
			render(<FilterDropdown {...sortProps} />);
			const sortIcon = screen.getByAltText('asc');
			fireEvent.click(sortIcon);
			expect(mockOnSelect).toHaveBeenCalledWith(sortProps.selected, 'desc');
		});
	});

	describe('날짜', () => {
		const dateProps = {
			...defaultProps,
			category: 'date' as keyof typeof FITERING_DATA,
			selected: '2024-03-14',
		};

		it('캘린더 컴포넌트가 렌더링되는지 테스트', () => {
			const CalendarMock = () => <div data-testid='calendar'>Calendar</div>;
			render(
				<FilterDropdown
					{...dateProps}
					isOpen={true}
					calendarComponent={<CalendarMock />}
				/>,
			);
			expect(screen.getByTestId('calendar')).toBeInTheDocument();
		});
	});

	it('외부 클릭 시 드롭다운이 닫히는지 테스트', () => {
		render(<FilterDropdown {...defaultProps} isOpen={true} />);
		fireEvent.mouseDown(document.body);
		expect(mockOnToggle).toHaveBeenCalled();
	});
});
