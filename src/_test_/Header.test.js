import { render } from '@testing-library/react';
import React from 'react';
import Header from '../components/Header';

test('renders title', () => {
	const { getByText } = render(<Header />);
	const span = getByText(/StarShips/);
	expect(span).toHaveTextContent('StarShips');
});
