import React from 'react';
import { cleanup } from '@testing-library/react';
import Container from 'src/components/container';
import { render, fireEvent } from '../testUtils';

afterEach(cleanup);
describe('Container component', () => {
    it('render its childs', () => {
        const { getAllByText } = render(<Container><div>test</div></Container>, {});
        expect(getAllByText(/test/ig)).toBeTruthy();
    });
});
