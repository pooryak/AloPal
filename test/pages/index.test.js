import React from 'react';
import { cleanup } from '@testing-library/react';
import { useMutation, useQueryClient } from 'react-query';
import { useToken } from 'src/utility/hooks';
import { render, fireEvent } from '../testUtils';
import Home from '../../pages/index';

jest.mock('react-query');

jest.mock('src/utility/hooks', () => ({
    useToken: () => false,
}));

afterEach(cleanup);
describe('Home page', () => {
    test('it should not render greeting', () => {
        const { queryByText } = render(<Home />, {});
        const greeting = queryByText(/Good Morning/ig);
        expect(greeting).not.toBeInTheDocument();
    });
});
 