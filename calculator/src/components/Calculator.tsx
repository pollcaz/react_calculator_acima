import React from 'react';
import { useState, useEffect } from 'react';
import type { TableRow, Operation } from '../interfaces/Tables.types';
import { fethHtmlDocument } from '../services/api';
import { calculateOperation } from '../utils/calculate';
import { extractTitleFromHtml, extractTablesFromHtml } from '../utils/htmlParser';
import HtmlViewer from './HtmlViewer';
import OperationInput from './OperationInput';

const Calculator: React.FC = () => {
    const [decodedHtml, setDecodedHtml] = useState<string>("");
    const [operation, setOperation] = useState<Operation>("A+B");
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [title, setTitle] = useState<string | null>(null);
    const [tables, setTables] = useState<{ A: TableRow[], B: TableRow[] }>({ A: [], B: [] });

    useEffect(() => {
        console.log("Loading document...");
        loadDocument();
    }, []);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const loadDocument = async () => {
        setLoading(true);
        setError(null);
        try {
            const htmlContent = await fethHtmlDocument();
            setDecodedHtml(htmlContent);
            setTitle(extractTitleFromHtml(htmlContent));
            setTables(extractTablesFromHtml(htmlContent));
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const handleCalculate = () => {
        try {
            const result = calculateOperation(operation, tables.A, tables.B);
            setResult(result);
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">{title || "Calculator"}</h1>
            <div className="row">
                <div className="col-12 col-md-6 mb-4 mb-md-0">
                    <HtmlViewer htmlContent={decodedHtml} />
                </div>
                <div className="col-12 col-md-6">
                    <br />
                    {loading && (
                        <div className="d-flex align-items-center mb-3">
                        <div className="spinner-border text-primary me-2" role="status" aria-hidden="true"></div>
                        <strong>Loading...</strong>
                        </div>
                    )}
                    <h2 className="mb-3 display-6">{result !== null ? `$${result}` : "$0.0"}</h2>
                    <OperationInput
                        onSubmit={handleCalculate}
                        value={operation.trim().toUpperCase()}
                        onChange={(value: string) => setOperation(value as Operation)}
                    />
                    {error && (
                        <div className="alert alert-danger alert-dismissible fade show mt-3" role="alert">
                            {error}
                            <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={() => setError(null)}
                            ></button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Calculator;