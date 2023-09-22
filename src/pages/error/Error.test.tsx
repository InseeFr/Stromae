import { render, screen } from '@testing-library/react';

import { ErrorRedirection } from './Error';

test('renders Route', () => {
	render(<ErrorRedirection />);
	const route = screen.getByTestId('error-page');
	expect(route).toBeInTheDocument();
});
