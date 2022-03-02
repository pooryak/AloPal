import React from 'react';
import { cleanup } from '@testing-library/react';
import { useMutation, useQueryClient } from 'react-query';
import { useToken } from 'src/utility/hooks';
import { render, fireEvent } from '../testUtils';
import About from '../../pages/about/';

jest.mock('react-query');

jest.mock('src/utility/hooks', () => ({
    useToken: () => false,
}));

afterEach(cleanup);
describe('contact page', () => {
    test('click on send message button', () => {
        const { queryByText } = render(<About />, {});
        // const greeting = queryByText(/Good Morning/ig);
        // expect(greeting).not.toBeInTheDocument();
    });
    test('testimonials rendered', () => {
        const { queryByText } = render(<About />, {});
        // const greeting = queryByText(/Good Morning/ig);
        // expect(greeting).not.toBeInTheDocument();
    });
});
