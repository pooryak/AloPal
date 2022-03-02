import React from 'react';
import { useRouter } from 'next/router';

import { useAuth } from 'src/utility/contexts/auth';
import Register from '../../pages/register';
import { act, render, fireEvent } from '../testUtils';

jest.mock('next/router');
jest.mock('src/utility/contexts/auth');

describe('Register', () => {
    let expectedSignIn; let expectedEmail; let expectedPassword; let
        expectedRouterPush;

    beforeEach(() => {
        expectedRouterPush = jest.fn();
        expectedSignIn = jest.fn();
        expectedSignIn.mockResolvedValue('');
        expectedEmail = 'eve.holt@reqres.in';
        expectedPassword = 'cityslicka';
        useRouter.mockReturnValue({ push: expectedRouterPush });
        useAuth.mockReturnValue({
            signin: expectedSignIn,
            userId: 123,
        });
        // useAuth.mockReturnValue(true);
        // useRouter.mockReturnValue({ push: '/' });
    });

    test('should redirect on sign in', async () => {
        const { getByText, getByLabelText, getByTestId } = render(<Register />);
        const logSpy = jest.spyOn(console, 'log');
        const email = getByLabelText('Email');
        const password = getByLabelText('Password');
        const signInButton = getByTestId('form');

        await act(async () => {
            fireEvent.change(email, { target: { value: expectedEmail } });
            fireEvent.change(password, { target: { value: expectedPassword } });
            fireEvent.submit(signInButton);
        });

        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(expectedSignIn).toHaveBeenCalledWith({ email: expectedEmail, password: expectedPassword });

        expect(expectedRouterPush).toHaveBeenCalledTimes(1);
        expect(expectedRouterPush).toHaveBeenCalledWith('/');
    });
});
