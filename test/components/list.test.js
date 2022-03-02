import React from 'react';
import { within } from '@testing-library/dom';
import { cleanup, screen } from '@testing-library/react';
import { act, render, fireEvent } from '../testUtils';
import '@testing-library/jest-dom';
import ServiceList from 'src/components/service-list';

afterEach(cleanup);
describe('Container component', () => {
    test('render its childs', async () => {
        const { getByLabelText, getByTestId } = render(<List />, {});
        const checkbox = getByLabelText('Psychotherapy');
        const { getByText } = within(getByTestId('searchBar'));
        await act(async () => {
            fireEvent.click(checkbox);
        });
        expect(getByText('Psychotherapy')).toBeInTheDocument();
    });
});
