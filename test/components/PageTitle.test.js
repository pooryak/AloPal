import React from 'react';
import { cleanup } from '@testing-library/react';
import { PageTitle } from 'src/components';
import { render, fireEvent } from '../testUtils';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

describe('Page Title component', () => {
    it('render its childs with style', () => {
        const { getByTestId } = render(<PageTitle>test</PageTitle>, {});
        expect(getByTestId('wrapper')).toHaveStyle({
            fontSize: '24px',
            fontWeight: 600,
            marginTop: '16px',
        });
    });
});
