export interface TableRow {
    item: string;
    price: number;
}

export interface ApiHtmlDocumentResponse {
    filename: string;
    content_type: string;
    base64: string;
}

export type Operation =
  | "A"
  | "B"
  | "A+A"
  | "A-B"
  | "A*B"
  | "A/B"
  | "A+B"
  | "A-A"
  | "B-A"
  | "B"
  | "B+B"
  | "B+A"
  | "B-B"
  | "B*A"
  | "B/A";