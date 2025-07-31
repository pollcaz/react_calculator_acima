import {render, screen} from '@testing-library/react';
import HtmlViewer from '../HtmlViewer';
import { describe, it,  expect } from 'vitest';

describe('HtmlViewer', () => {
    it('renders the HTML content in an iframe', () => {
        const htmlContent = '<h1>Test Title</h1><p>Test Content</p>';
        render(<HtmlViewer htmlContent={htmlContent} />);

        const iframe = screen.getByTitle('HTML Content Viewer');
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute('srcdoc', htmlContent);
    });

    it('applies correct styles to the iframe', () => {
        const htmlContent = '<h1>Test Title</h1><p>Test Content</p>';
        render(<HtmlViewer htmlContent={htmlContent} />);

        const iframe = screen.getByTitle('HTML Content Viewer');
        expect(iframe).toHaveStyle('border: 0; width: 110%; height: 400px;');
    });
});