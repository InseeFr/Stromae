import { render, screen } from '@testing-library/react';

import { Footer } from './Footer';

test('renders Route', () => {
	render(<Footer />);
	const route = screen.getByTestId('fr-footer');
	expect(route).toBeInTheDocument();
});
