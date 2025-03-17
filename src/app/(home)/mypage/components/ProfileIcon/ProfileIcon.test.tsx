import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProfileIcon from './ProfileIcon';

describe('ProfileIcon Component', () => {
	test('renders children properly', () => {
		render(
			<ProfileIcon>
				<span data-testid='child'>Test Child</span>
			</ProfileIcon>,
		);
		expect(screen.getByTestId('child')).toBeInTheDocument();
	});
});

describe('Avatar Component', () => {
	test('renders without crashing', () => {
		render(<ProfileIcon.Avatar />);
		expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
	});
});

describe('Pencil Component', () => {
	test('renders with correct size', () => {
		render(<ProfileIcon.Pencil size='large' />);
		const svgElement = screen.getByRole('img', { hidden: true });
		expect(svgElement).toHaveAttribute('width', '32');
		expect(svgElement).toHaveAttribute('height', '32');
	});
});

describe('EditProfile Component', () => {
	test('renders Avatar and Pencil icon', () => {
		render(<ProfileIcon.EditProfile />);

		const images = screen.queryAllByRole('img', { hidden: true });
		images.forEach((image) => {
			expect(image).toBeInTheDocument();
		});
	});
});
