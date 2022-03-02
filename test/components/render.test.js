import React from 'react';
import { cleanup } from '@testing-library/react';
import { Render } from 'src/components';
import { render, fireEvent } from '../testUtils';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

describe('Render component', () => {
    it('render its childs', () => {
        const { getAllByText } = render(<Render condition><div>test</div></Render>, {});
        expect(getAllByText(/test/ig)).toBeTruthy();
    });
});

describe('Render component', () => {
    it('render its childs', () => {
        const component = render(<Render><div>test</div></Render>, {});
        const childComponent = component.queryByText('test');
        expect(childComponent).toBeNull();
    });
});
