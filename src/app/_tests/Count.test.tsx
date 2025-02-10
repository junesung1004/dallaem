import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Count from './Count';

describe('Count Component', () => {
	//컴포넌트 안의 dom이 잘 렌더링 되는지 test case code
	it('renders h1 and buttons correctly', () => {
		render(<Count />);

		// h1 텍스트가 잘 렌더링 되는지 확인
		expect(screen.getByText('Count : 0')).toBeInTheDocument();

		// '+' 버튼이 잘 렌더링 되는지 확인
		expect(screen.getByText('+ 버튼')).toBeInTheDocument();

		// '-' 버튼이 잘 렌더링 되는지 확인
		expect(screen.getByText('- 버튼')).toBeInTheDocument();
	});

	//+버튼 기능이 잘 작동 되는지 test case code
	it('increments count when + button is clicked', () => {
		render(<Count />);

		//초기 count 값이 0인지 확인..
		expect(screen.getByText('Count : 0')).toBeInTheDocument();

		// + 버튼 클릭
		fireEvent.click(screen.getByText('+ 버튼'));

		// count 값이 1로 증가했는지 확인
		expect(screen.getByText('Count : 1')).toBeInTheDocument();
	});

	// -버튼 기능이 잘 작동 되는지 test case code
	it('decresements count when + button is clicked', () => {
		render(<Count />);

		//초기 count 값이 0인지 확인
		expect(screen.getByText('Count : 1')).toBeInTheDocument();

		// - 버튼 클릭
		fireEvent.click(screen.getByText('- 버튼'));

		// -버튼 기능이 잘 작동 되는지 test case code
		expect(screen.getByText('Count : 0')).toBeInTheDocument();
	});
});
