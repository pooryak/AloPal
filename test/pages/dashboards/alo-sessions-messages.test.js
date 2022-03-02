import React from 'react';
import { cleanup } from '@testing-library/react';
import { useMutation, useQueryClient } from 'react-query';
import Dashboard from '../../../pages/dashboards/ALO/messages';
import { useToken } from 'src/utility/hooks';
import { render, fireEvent } from '../testUtils';

jest.mock('react-query');

jest.mock('src/utility/hooks', () => ({
    useToken: () => false,
}));

afterEach(cleanup);
describe('dashboard-messages page', () => {
    test('list of people who had meetings', () => {
        const { queryByText } = render(<Dashboard />, {});
        // const greeting = queryByText(/Good Morning/ig);
        // expect(greeting).not.toBeInTheDocument();
    });
    test('with click on one person show the chat history', () => {
        const { queryByText } = render(<Dashboard />, {});
        // const greeting = queryByText(/Good Morning/ig);
        // expect(greeting).not.toBeInTheDocument();
    });
    test('send message and see result in history', () => {
        const { queryByText } = render(<Dashboard />, {});
        // const greeting = queryByText(/Good Morning/ig);
        // expect(greeting).not.toBeInTheDocument();
    });
});
