import React from 'react';
import type { OperationInputProps } from '../interfaces/OperationInput.types';

const OperationInput: React.FC<OperationInputProps> = ({ onSubmit, value, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value.trim().toUpperCase());
    };

    const handleClick = () => {
        onSubmit();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onSubmit();
        }
    };

    return (
        <div >
            <input
                id="operationInput"
                type="text"
                className="form-control form-control-lg mb-3"
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Example: A+B"
            />
            <button
                type="submit"
                className="btn btn-primary btn-lg"
                onClick={handleClick}>Calculate
            </button>
        </div>
    );
}

export default OperationInput;