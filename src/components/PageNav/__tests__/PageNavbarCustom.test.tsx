import { render, screen, fireEvent } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import PageNavbar from '../PageNavbarCustom';
import { NAV_DATA } from '@/constants';
import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
	usePathname: jest.fn(),
}));

describe('PageNavbar', () => {
	const pageKey = 'meetings';
	const pageNavData = NAV_DATA[pageKey];

	beforeEach(() => {
		(usePathname as jest.Mock).mockReturnValue('/mypage');
		jest.clearAllMocks();
	});

	it('메인 네비게이션 버튼이 올바르게 렌더링되는지 테스트', () => {
		render(<PageNavbar pageKey={pageKey} />);

		const firstMainButton = screen.getByRole('button', {
			name: new RegExp(pageNavData[0].label, 'i'),
		});
		expect(firstMainButton).toBeInTheDocument();

		// 첫 번째 버튼이 활성화되어 있는지 확인
		expect(firstMainButton).toHaveClass('text-black');
	});

	it('메인 버튼 클릭 시 onMainClick이 호출되고 상태가 변경되는지 테스트', async () => {
		const onMainClick = jest.fn();
		render(<PageNavbar pageKey={pageKey} onMainClick={onMainClick} />);

		const firstButton = screen.getByRole('button', {
			name: new RegExp(pageNavData[0].label, 'i'),
		});
		const secondButton = screen.getByRole('button', {
			name: new RegExp(pageNavData[1].label, 'i'),
		});

		// 초기 상태 확인
		expect(firstButton).toHaveClass('text-black');
		expect(secondButton).toHaveClass('text-gray-400');

		// 두 번째 버튼 클릭
		fireEvent.click(secondButton);

		// 클릭 후 상태 변경 확인
		expect(onMainClick).toHaveBeenCalledWith(pageNavData[1].id);
		expect(firstButton).toHaveClass('text-gray-400');
		expect(secondButton).toHaveClass('text-black');
	});

	it('서브 버튼 클릭 시 onSubClick이 호출되고 상태가 변경되는지 테스트', () => {
		const onSubClick = jest.fn();
		render(<PageNavbar pageKey={pageKey} onSubClick={onSubClick} />);

		const mainItem = pageNavData.find(
			(item) => item.subItems && item.subItems.length > 0,
		);
		if (mainItem && mainItem.subItems) {
			// 메인 버튼 클릭
			const mainButton = screen.getByRole('button', {
				name: new RegExp(mainItem.label, 'i'),
			});
			fireEvent.click(mainButton);

			// 서브 버튼들의 초기 상태 확인
			const firstSubButton = screen.getByRole('button', {
				name: mainItem.subItems[0].label,
			});
			expect(firstSubButton).toHaveClass('bg-gray-900', 'text-white');

			// 다른 서브 버튼이 있다면 비활성화 상태 확인
			if (mainItem.subItems.length > 1) {
				const secondSubButton = screen.getByRole('button', {
					name: mainItem.subItems[1].label,
				});
				expect(secondSubButton).toHaveClass('bg-gray-200', 'text-gray-900');

				// 두 번째 서브 버튼 클릭
				fireEvent.click(secondSubButton);
				expect(onSubClick).toHaveBeenCalledWith(mainItem.subItems[1].id);
				expect(firstSubButton).toHaveClass('bg-gray-200', 'text-gray-900');
				expect(secondSubButton).toHaveClass('bg-gray-900', 'text-white');
			}
		}
	});

	it('필터 prop이 전달되었을 때 올바르게 초기 상태가 설정되는지 테스트', () => {
		const mainItem = pageNavData[1];
		const filter = { type: mainItem.id };

		render(<PageNavbar pageKey={pageKey} filter={filter} />);

		// 필터에 해당하는 버튼이 활성화되어 있는지 확인
		const activeButton = screen.getByRole('button', {
			name: new RegExp(mainItem.label, 'i'),
		});
		expect(activeButton).toHaveClass('text-black');
	});

	it('마이페이지 경로에서 올바르게 동작하는지 테스트', () => {
		(usePathname as jest.Mock).mockReturnValue('/mypage/section1/subsection1');

		render(<PageNavbar pageKey='mypage' />);

		const buttons = screen.getAllByRole('button');
		expect(buttons.length).toBeGreaterThan(0);
	});

	it('초기 렌더링 시 올바른 버튼이 선택되어야 함', () => {
		render(<PageNavbar pageKey={pageKey} />);

		const initialMainButton = screen.getByRole('button', {
			name: new RegExp(pageNavData[0].label, 'i'),
		});

		// 메인 버튼 상태 확인
		expect(initialMainButton).toHaveClass('text-black');

		// 서브 버튼 상태 확인
		if (pageNavData[0].subItems?.length) {
			const initialSubButton = screen.getByRole('button', {
				name: pageNavData[0].subItems[0].label,
			});
			expect(initialSubButton).toHaveClass('bg-gray-900', 'text-white');
		}
	});
});
