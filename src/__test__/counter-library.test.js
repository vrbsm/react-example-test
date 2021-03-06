import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './../components';

test('counter increments and decrements when the button are clicked', () => {

    render(<Counter />);
    const increment = screen.getByRole('button', { name: /increment/i });
    const decrement = screen.getByRole('button', { name: /decrement/i });
    const message = screen.getByText(/count/i);

    expect(message.textContent).toBe('Count: 0');
    userEvent.click(increment);
    expect(message).toHaveTextContent('Count: 1');
    userEvent.click(decrement);
    expect(message.textContent).toBe('Count: 0');
});
