import React from 'react';
import { cleanup } from '@testing-library/react';
import { useMutation, useQueryClient } from 'react-query';
import Dashboard from '../../pages/dashboards/ALO';
import { useToken } from 'src/utility/hooks';
import { render, fireEvent } from '../testUtils';

jest.mock('react-query');

jest.mock('src/utility/hooks', () => ({
    useToken: () => false,
}));

afterEach(cleanup);
describe('About page', () => {
    test('show upcoming messages correctly', () => {
        const { queryByText } = render(<Dashboard />, {});
        // const greeting = queryByText(/Good Morning/ig);
        // expect(greeting).not.toBeInTheDocument();
    });
    test('show unred Messages numbers correctly', () => {
        const { queryByText } = render(<Dashboard />, {});
        // const greeting = queryByText(/Good Morning/ig);
        // expect(greeting).not.toBeInTheDocument();
    });
    test('show Pals card correctly', () => {
        const { queryByText } = render(<Dashboard />, {});
        // const greeting = queryByText(/Good Morning/ig);
        // expect(greeting).not.toBeInTheDocument();
    });
    test('show balance correctly', () => {
        const { queryByText } = render(<Dashboard />, {});
        // const greeting = queryByText(/Good Morning/ig);
        // expect(greeting).not.toBeInTheDocument();
    });
    test('show popular sessions', () => {
        const { queryByText } = render(<Dashboard />, {});
        // const greeting = queryByText(/Good Morning/ig);
        // expect(greeting).not.toBeInTheDocument();
    });
});
