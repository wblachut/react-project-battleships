/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import Header from '../components/Header.jsx';
import NewGame from '../components/NewGame.jsx';

test('renders title', () => {
	render(<App />);
	const { getByText } = render(<Header />);
	const span = getByText(/StarShips/);
	expect(span).toHaveTextContent('StarShips');
});

test('renders learn react link', () => {
	render(<NewGame />);
	const NewGameButton = screen.getByText(/contend the empire/i);
	expect(NewGameButton).toBeInTheDocument();
});
