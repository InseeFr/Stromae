import { render, screen } from '@testing-library/react';

import { Error } from './Error';

test('renders Route', () => {
	render(<Error />);
	const route = screen.getByTestId('error-page');
	expect(route).toBeInTheDocument();
});
