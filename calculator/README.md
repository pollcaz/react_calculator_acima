# Acima Calculator Frontend

This is the frontend application for **Acima Calculator**, a web-based calculator that decodes HTML data from the backend and performs mathematical operations between two tables (A and B) defined in that document.

## 🧱 Tech Stack

- React 18+
- TypeScript
- Vite
- Bootstrap 5
- Axios
- Vitest (for testing)
- Docker & Docker Compose

## 🧩 Features

- Fetches a base64-encoded HTML document from the Rails API backend.
- Decodes and renders tables A and B in an iframe.
- Allows users to input expressions like `A`, `B`, `A+B`, `A-B`, `A*A`, `B/A`, etc.
- Displays operation results with styled output.
- Includes loading spinners, error handling, and dismissible alerts.
- Uses Docker for development and deployment.

## 🔗 Backend API

The frontend consumes the following endpoint from the Rails backend:

GET http://localhost:3000/api/v1/html_documents/data_tables

Response:

```json
{
  "filename": "document.html",
  "content_type": "text/html",
  "base64": "<base64_encoded_html_content>"
}
```