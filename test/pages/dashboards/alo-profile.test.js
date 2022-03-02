import React from 'react';
import { act, cleanup } from '@testing-library/react';
import { useMutation, useQueryClient } from 'react-query';
import { useToken } from 'src/utility/hooks';
jest.mock('axios');
import axios from 'axios';
import Dashboard from '../../../pages/dashboards/ALO/settings';
import { render, fireEvent } from '../../testUtils';

jest.mock('react-query');

jest.mock('src/utility/hooks', () => ({
    useToken: () => ({ token: { is_login: true }, is_login: true }),
}));
afterEach(cleanup);
describe('dashboard-settings page', () => {
    test('tabs', () => {
        const { queryByText, getByText } = render(<Dashboard />, {});
        const profile = getByText(/Profile/ig);
        const photo = queryByText(/PHOTO/ig);
        const changepassword = queryByText(/CHANGE/ig);
        const notifications = queryByText(/NOTIFICATIONS/ig);
        expect(profile).toBeInTheDocument();
        expect(photo).toBeInTheDocument();
        expect(changepassword).toBeInTheDocument();
        expect(notifications).toBeInTheDocument();
    });
    test('change value of form', () => {
        const { getByLabelText, getByTestId } = render(<Dashboard />, {});
        const name = getByLabelText(/Full Name/ig);
        const saveButton = getByTestId('form');
        try {
            act(() => {
                fireEvent.change(name, { target: { value: 'test' } });
                fireEvent.submit(saveButton);
            });
        } catch (e) {
            console.log(e, 'error');
        }
        // const greeting = queryByText(/Good Morning/ig);
        // expect(axios).toBeCalledWith(name);
    });
    test('send message and see result in history', () => {
        const { queryByText } = render(<Dashboard />, {});
        // const greeting = queryByText(/Good Morning/ig);
        // expect(greeting).not.toBeInTheDocument();
    });
});
