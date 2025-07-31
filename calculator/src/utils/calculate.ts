import type { TableRow, Operation } from '../interfaces/Tables.types';

const sum = (items: TableRow[]): number =>
    items.reduce((acc, item) => acc + item.price, 0);

export function calculateOperation(op: Operation, A: TableRow[], B: TableRow[]): number {
    const sumA = sum(A);
    const sumB = sum(B);

    switch (op) {
        case 'A': return sumA;
        case 'B': return sumB;
        case 'A+A': return sumA + sumA;
        case 'A-A': return sumA - sumA;
        case 'A-B': return sumA - sumB;
        case 'B-A': return sumB - sumA;
        case 'B-B': return sumB - sumB;
        case 'A+B':
        case 'B+A': return sumB + sumA;
        case 'A*B':
        case 'B*A': return sumB * sumA;
        case 'A/B': return sumB !== 0 ? sumA / sumB : NaN;
        case 'B/A': return sumA !== 0 ? sumB / sumA : NaN;
        default:
            throw new Error(`Invalid operation: ${op}`); // or return 0;
    }
}