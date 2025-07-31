# Acima Calculator - Backend API

This is the backend API for **Acima Calculator**, built with **Ruby on Rails 7.2.2.1** (API-only mode). It serves a single HTML document encoded in base64, which is consumed by a React frontend calculator to perform various operations on extracted tables.

---

## 🔧 Tech Stack

- **Ruby**: 3.4.4
- **Rails**: 7.2.2.1 (API Mode)
- **Database**: SQLite (for local development)
- **Testing**: RSpec
- **CORS Enabled** for frontend integration
- **Dockerized** for easy setup and deployment

---

## 📦 API Endpoint

### `GET /api/v1/html_documents/data_tables`

Returns a JSON response containing a base64-encoded HTML document. This document includes two tables (`A` and `B`) used for calculations on the frontend.

#### Example Response

```json
{
  "filename": "tables_document.html",
  "content_type": "text/html",
  "base64": "<base64-encoded HTML string>"
}
