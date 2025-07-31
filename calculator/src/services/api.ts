import axios from 'axios';
import type { ApiHtmlDocumentResponse } from '../interfaces/Tables.types';

export const fethHtmlDocument = async (): Promise<string> => {
    const response = await axios.get<ApiHtmlDocumentResponse>("http://localhost:3000/api/v1/html_documents/data_tables");
    
    const { base64 } = response.data;
    const decodedHtml = atob(base64);
    return decodedHtml;
}