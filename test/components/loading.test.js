import React from 'react';
import { cleanup } from '@testing-library/react';
import Loading from 'src/components/loading-provider';
import { render } from '../testUtils';
import '@testing-library/jest-dom';

afterEach(cleanup);
describe('loading component', () => {
    test('render its childs', async () => {
        const { getByText } = render(<Loading condition={false}><div>test</div></Loading>, {});
        expect(getByText('test')).toBeInTheDocument();
    });
    test('render loading', async () => {
        const { queryByText } = render(<Loading condition><div>test</div></Loading>, {});
        expect(queryByText('test')).not.toBeInTheDocument();
    });
});
