import { renderHook, act } from '@testing-library/react';
import { useFilters } from '../useFilters';

describe('useFilters 커스텀 훅 테스트', () => {
	it('초기 필터 값이 올바르게 설정되는지 확인', () => {
		const initialFilter = {
			type: 'DALLAEMFIT',
			location: '건대입구',
			date: '2025-03-01',
			sortBy: 'createdAt',
			sortOrder: 'asc' as 'asc' | 'desc',
		};

		const { result } = renderHook(() => useFilters(initialFilter));

		expect(result.current.currentFilter).toEqual(initialFilter);
	});

	it('handleChangeFilter가 각 필터를 변경하는지 확인', () => {
		const { result } = renderHook(() => useFilters({}));

		act(() => {
			result.current.handleChangeFilter('type', 'DALLAEMFIT');
		});
		expect(result.current.currentFilter.type).toBe('DALLAEMFIT');

		act(() => {
			result.current.handleChangeFilter('location', '건대입구');
		});
		expect(result.current.currentFilter.location).toBe('건대입구');

		act(() => {
			result.current.handleChangeFilter('date', '2025-03-14');
		});
		expect(result.current.currentFilter.date).toBe('2025-03-14');

		act(() => {
			result.current.handleChangeFilter('sortBy', 'createdAt');
		});
		expect(result.current.currentFilter.sortBy).toBe('createdAt');

		act(() => {
			result.current.handleChangeFilter('sortOrder', 'asc');
		});
		expect(result.current.currentFilter.sortOrder).toBe('asc');
	});

	it('handleTypeHandler 실행 시 type 필터가 변경되는지 확인', () => {
		const { result } = renderHook(() =>
			useFilters({
				type: '',
			}),
		);

		act(() => {
			result.current.handleTypeHandler('WORKATION');
		});
		expect(result.current.currentFilter.type).toBe('WORKATION');
	});
});

it('onFilter가 호출되는지 확인', () => {
	const onFilterMock = jest.fn();

	renderHook(() =>
		useFilters(
			{
				type: 'DALLAEMFIT',
				location: '건대입구',
				date: '',
				sortBy: 'createdAt',
				sortOrder: 'asc',
			},
			onFilterMock,
		),
	);

	expect(onFilterMock).toHaveBeenCalledTimes(1);
	expect(onFilterMock).toHaveBeenCalledWith({
		type: 'DALLAEMFIT',
		location: '건대입구',
		date: '',
		sortBy: 'createdAt',
		sortOrder: 'asc',
	});
});
