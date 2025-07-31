import React from 'react';
import type { HtmlViewerProps } from '../interfaces/HtmlViewer.types';

const HtmlViewer: React.FC<HtmlViewerProps> = ({ htmlContent }) => {
    return (
        <div className="d-flex flex-column">
            <iframe
                title="HTML Content Viewer"
                srcDoc={htmlContent}
                style={{ border: "0", width: "110%", height: "400px"}}
            />
        </div>
    );
}

export default HtmlViewer;