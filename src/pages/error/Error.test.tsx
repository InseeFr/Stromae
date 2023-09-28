import { render, screen } from '@testing-library/react';

import { RouteError } from './Error';

test('renders Route', () => {
	render(<RouteError />);
	const route = screen.getByTestId('error-page');
	expect(route).toBeInTheDocument();
});
