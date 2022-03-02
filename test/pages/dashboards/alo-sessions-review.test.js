import React from 'react';
import { cleanup } from '@testing-library/react';
import { useMutation, useQueryClient } from 'react-query';
import Dashboard from '../../../pages/dashboards/ALO/sessions-and-courses/[id]/review';
import { useToken } from 'src/utility/hooks';
import { render, fireEvent } from '../testUtils';

jest.mock('react-query');

jest.mock('src/utility/hooks', () => ({
    useToken: () => false,
}));

afterEach(cleanup);
describe('dashboard-session-review page', () => {
    test('check url for correct id', () => {
        const { queryByText } = render(<Dashboard />, {});
        // const greeting = queryByText(/Good Morning/ig);
        // expect(greeting).not.toBeInTheDocument();
    });
    test('rate and comment button', () => {
        const { queryByText } = render(<Dashboard />, {});
        // const greeting = queryByText(/Good Morning/ig);
        // expect(greeting).not.toBeInTheDocument();
    });
});
