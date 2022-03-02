import React from 'react';
import { cleanup } from '@testing-library/react';
import { useAuth } from 'src/utility/contexts/auth';
import { Authentication } from 'src/components';
import { render, fireEvent } from '../testUtils';

jest.mock('src/utility/contexts/auth');

afterEach(cleanup);

describe('Authentication component logged in', () => {
    beforeEach(() => {
        useAuth.mockReturnValue({
            checkUser: () => ({
                is_login: false,
            }),
        });
    });
    it('render its childs', () => {
        const { getAllByText } = render(<Authentication><div>test</div></Authentication>, {});
        expect(getAllByText(/You don't have permission to access this page please Login/ig)).toBeTruthy();
    });
});


describe('Authentication component not logged in', () => {
    beforeEach(() => {
        useAuth.mockReturnValue({
            checkUser: () => ({
                is_login: true,
            }),
        });
    });
    it('render its childs', () => {
        const { getAllByText } = render(<Authentication><div>test</div></Authentication>, {});
        expect(getAllByText(/test/ig)).toBeTruthy();
    });
});
