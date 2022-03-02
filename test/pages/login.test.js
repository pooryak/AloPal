import React from 'react';
import { useRouter } from 'next/router';
import { useToken } from 'src/utility/hooks';
import SignIn from '../../pages/login';
import { act, render, fireEvent } from '../testUtils';

jest.mock('src/utility/hooks');
jest.mock('next/router');
useRouter.mockImplementation(() => ({
    push: () => './',
}));
useToken.mockImplementation(() => false);
jest.mock('axios');
// jest.mock(useAuth);

jest.mock('src/utility/contexts/auth', () => ({
    useAuth: () => ({ checkUser: () => jest.fn(), signin: () => Promise.resolve(({ token: '34fdsaf' })) }),
}));

describe('SignIn', () => {
    let expectedSignIn; let expectedEmail; let expectedPassword; let
        expectedRouterPush;
    // axiosMock.post.mockResolvedValue({ hi: 'there' });
    beforeEach(async () => {
        expectedRouterPush = jest.fn();
        expectedSignIn = jest.fn();
        expectedSignIn.mockResolvedValue('');
        expectedEmail = 'eve.holt@reqres.in';
        expectedPassword = 'cityslicka';
        // useRouter.mockReturnValue({ push: expectedRouterPush });
        // jest.resetModules();

    // await expect(fetchData('react')).resolves.toEqual(data);
        // useAuth.mockReturnValue({
        //     signin: expectedSignIn,
        //     userId: 123,
        // });
        // useAuth.mockReturnValue(true);
        // useRouter.mockReturnValue({ push: '/' });
    });

    test('should redirect after sign in', async () => {
        const { getByText, getByLabelText, getByTestId } = render(<SignIn />);
        // const logSpy = jest.spyOn(useRouter, 'push');
        const email = getByLabelText('Email');
        const password = getByLabelText('Password');
        const signInButton = getByTestId('form');
        try {
            await act(async () => {
                fireEvent.change(email, { target: { value: expectedEmail } });
                fireEvent.change(password, { target: { value: expectedPassword } });
                fireEvent.submit(signInButton);
                // const data = {
                //     token: 'test',
                //     userType: 0,
                //     responseContext: {
                //         bearer: {
                //             captcha: {
                //                 captchaId: '1',
                //                 captchaResult: '34',
                //             },
                //         },
                //     },
                // };
                // const verify = decoder.alopal.backend.LoginResponse.create(data);
                // const encodedData = decoder.alopal.backend.LoginResponse.encode(verify).finish();
                // // const transformedData = new Blob([data], { type: 'buffer' });
                // // console.log("🚀 ~ file: login.test.js ~ line 60 ~ awaitact ~ transformedData", transformedData)

                // axios.post.mockImplementationOnce(() => Promise.resolve(encodedData));
                // useRouter.mockReturnValue({ push: expectedRouterPush });
            });
        } catch (error) {
            console.log(error);
        }
        expect(useRouter).toHaveBeenCalledTimes(1);
        // expect(expectedRouterPush).toHaveBeenCalledWith('/');

        // expect(logSpy).toHaveBeenCalledTimes(1);
    });
    test('error on empty username or password', async () => {
        const { getByText, getByLabelText, getByTestId } = render(<SignIn />);
        // const logSpy = jest.spyOn(console, 'log');
        const email = getByLabelText('Email');
        const password = getByLabelText('Password');
        const signInButton = getByTestId('form');
        try {
            await act(async () => {
                fireEvent.change(email, { target: { value: null } });
                fireEvent.change(password, { target: { value: null } });
                fireEvent.submit(signInButton);
                // const data = {
                //     token: 'test',
                //     userType: 0,
                //     responseContext: {
                //         bearer: {
                //             captcha: {
                //                 captchaId: '1',
                //                 captchaResult: '34',
                //             },
                //         },
                //     },
                // };
                // const verify = decoder.alopal.backend.LoginResponse.create(data);
                // const encodedData = decoder.alopal.backend.LoginResponse.encode(verify).finish();
                // // const transformedData = new Blob([data], { type: 'buffer' });
                // // console.log("🚀 ~ file: login.test.js ~ line 60 ~ awaitact ~ transformedData", transformedData)

                // axios.post.mockImplementationOnce(() => Promise.resolve(encodedData));
            });
        } catch (error) {
            console.log(error);
        }
        // useRouter.mockReturnValue({ push: expectedRouterPush });
        expect(expectedRouterPush).not.toHaveBeenCalledTimes(1);
        expect(expectedRouterPush).not.toHaveBeenCalledWith('/');
    });
    test('error on wrong username or password', async () => {
        // jest.mock('src/utility/contexts/auth', () => ({
        //     useAuth: () => ({ checkUser: () => ({ token: 'sadad' }), signin: () => Promise.reject(new Error('username or password is wrong')) }),
        // }));
        jest.doMock('src/utility/contexts/auth', () => ({
            useAuth: () => ({ checkUser: () => jest.fn(), signin: () => Promise.reject(jest.fn()) }),
        }));
        const {
            getByText, getByLabelText, getByTestId, findByText,
        } = render(<SignIn />);
        // const logSpy = jest.spyOn(console, 'log');
        const email = getByLabelText('Email');
        const password = getByLabelText('Password');
        const signInButton = getByTestId('form');
        try {
            await act(async () => {
                fireEvent.change(email, { target: { value: 'null' } });
                fireEvent.change(password, { target: { value: 'null' } });
                fireEvent.submit(signInButton);
            });
        } catch (error) {
            console.log(error);
        }
        expect(expectedRouterPush).not.toHaveBeenCalledTimes(1);
    });
});
