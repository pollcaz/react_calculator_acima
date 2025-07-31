import type { TableRow } from '../interfaces/Tables.types';

export function extractTitleFromHtml(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const title = doc.querySelector('title');
    return title ? title.textContent || "" : "HTML Document - Untitled";
}

export function extractTablesFromHtml(html: string): { A: TableRow[]; B: TableRow[] } {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const tables = doc.querySelectorAll('table');
    if(tables.length < 2){
        throw new Error("Expected at least two tables in the HTML document.");
    }

    const parseTable = (table: HTMLTableElement): TableRow[] => {
        const rows = table.querySelectorAll('tr');
        const items: TableRow[] = [];

        rows.forEach((row, index) =>{
            const columns = row.querySelectorAll('td');
            if (columns.length < 2) {
                console.warn(`Row ${index + 1} does not have enough columns.`);
                return;
            }

            const item = columns[0].textContent?.trim() || "";
            const price = parseFloat(columns[1].textContent?.replace(/[^\d.-]+/g, "") || "0");
            if (item && !isNaN(price)) {
                items.push({ item, price });
            } else {
                console.warn(`Row ${index + 1} has invalid data: item="${item}", price="${columns[1].textContent}"`);
            }
        }

        );
        return items;
    };

    const tableA = parseTable(tables[0] as HTMLTableElement);
    const tableB = parseTable(tables[1] as HTMLTableElement);

    return { A: tableA, B: tableB };
}