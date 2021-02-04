import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { Login } from '../components'
test('onSubmit with username and password', () => {
    const handleSubmit = jest.fn()
    render(<Login onSubmit={handleSubmit} />);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button',{ name: /submit/i });
    // typing
    userEvent.type(usernameInput, 'vrbsm');
    userEvent.type(passwordInput, '1234');
    // click
    userEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({ username: 'vrbsm', password: '1234'})
    expect(handleSubmit).toHaveBeenCalledTimes(1);
})