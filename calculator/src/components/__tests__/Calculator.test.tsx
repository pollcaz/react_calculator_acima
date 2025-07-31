import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Calculator from '../Calculator';
import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import * as api from '../../services/api';
import * as calculate from '../../utils/calculate';
import * as htmlParser from '../../utils/htmlParser';

const mockHtmlContent = `
<html>
    <head><title>Test Document</title></head>
    <body>
      <table id="A"><tr><td>Item 1</td><td>10</td></tr></table>
      <table id="B"><tr><td>Item 2</td><td>20</td></tr></table>
    </body>
  </html>
`;

const mockTables = {
    A: [{ item: 'Item 1', price: 10 }],
    B: [{ item: 'Item 2', price: 20 }],
};

describe('Calculator', () => {
    describe('When the component is rendered the first time', () => {
        it('Renders the Calculator component without crashing and with default title and and defaault result', async () => {
            render(<Calculator />);
            expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
            expect(screen.getByText('Calculator')).toBeInTheDocument();
            expect(screen.getByText('$0.0')).toBeInTheDocument();
        });
    });
    describe('When the HTML document is loaded', () => {
        beforeEach(() => {
            vi.clearAllMocks();
            vi.spyOn(api, 'fethHtmlDocument').mockResolvedValue(mockHtmlContent);
            vi.spyOn(htmlParser, 'extractTitleFromHtml').mockReturnValue('Test Document');
            vi.spyOn(htmlParser, 'extractTablesFromHtml').mockReturnValue(mockTables);
            vi.spyOn(calculate, 'calculateOperation').mockReturnValue(30);
        });
        afterEach(() => {
            vi.restoreAllMocks();
        });

        it('Loads the HTML document and extracts title and tables', async () => {
            render(<Calculator />);
            await waitFor(() => expect(screen.getByText('Test Document')).toBeInTheDocument());
            expect(htmlParser.extractTitleFromHtml).toHaveBeenCalledWith(mockHtmlContent);
            expect(htmlParser.extractTablesFromHtml).toHaveBeenCalledWith(mockHtmlContent);
        });

        describe('When the user selects an operation and clicks Calculate', () => {
            it('Calculates the operation and updates the result', async () => {
                render(<Calculator />);
                await waitFor(() => expect(screen.getByText('Test Document')).toBeInTheDocument());

                fireEvent.change(screen.getByPlaceholderText('Example: A+B'), {
                    target: { value: 'A+B' },
                });
                fireEvent.click(screen.getByRole('button', { name: 'Calculate' }));

                await waitFor(() => expect(screen.getByText('$30')).toBeInTheDocument());
                expect(calculate.calculateOperation).toHaveBeenCalledWith('A+B', mockTables.A, mockTables.B);
            });
        });
        describe('When an invalid operation is entered', () => {
            it('Displays an error message', async () => {
                vi.spyOn(calculate, 'calculateOperation').mockImplementation(() => {
                    throw new Error('Invalid operation');
                });

                render(<Calculator />);
                await waitFor(() => expect(screen.getByText('Test Document')).toBeInTheDocument());

                fireEvent.change(screen.getByPlaceholderText('Example: A+B'), {
                    target: { value: 'InvalidOperation' },
                });
                fireEvent.click(screen.getByRole('button', { name: 'Calculate' }));

                await waitFor(() => expect(screen.getByText('Invalid operation')).toBeInTheDocument());
            });
        });
    });
});