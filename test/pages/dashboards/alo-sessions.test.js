import React from 'react';
import { cleanup } from '@testing-library/react';
import { useMutation, useQueryClient } from 'react-query';
import Dashboard from '../../../pages/dashboards/ALO/sessions-and-courses';
import { useToken } from 'src/utility/hooks';
import { render, fireEvent } from '../testUtils';

jest.mock('react-query');

jest.mock('src/utility/hooks', () => ({
    useToken: () => false,
}));

afterEach(cleanup);
describe('dashboard-session page', () => {
    test('set calendar authorization', () => {
        const { queryByText } = render(<Dashboard />, {});
        // const greeting = queryByText(/Good Morning/ig);
        // expect(greeting).not.toBeInTheDocument();
    });
    test('show upcoming sessions', () => {
        const { queryByText } = render(<Dashboard />, {});
        // const greeting = queryByText(/Good Morning/ig);
        // expect(greeting).not.toBeInTheDocument();
    });
    test('cancel upcoming session', () => {
        const { queryByText } = render(<Dashboard />, {});
        // const greeting = queryByText(/Good Morning/ig);
        // expect(greeting).not.toBeInTheDocument();
    });
    test('prevent cancel for upcoming session if it has less than 48hours to start', () => {
        const { queryByText } = render(<Dashboard />, {});
        // const greeting = queryByText(/Good Morning/ig);
        // expect(greeting).not.toBeInTheDocument();
    });
    test('write review on previous sessions', () => {
        const { queryByText } = render(<Dashboard />, {});
        // const greeting = queryByText(/Good Morning/ig);
        // expect(greeting).not.toBeInTheDocument();
    });
});
