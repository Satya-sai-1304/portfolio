# Satya Sai Portfolio

Full-stack portfolio: a React + Vite frontend and an Express + MongoDB backend.

```
Portfolio/
├── frontend/   React, TypeScript, Vite, Tailwind CSS, Framer Motion
└── backend/    Node.js, Express, Mongoose (MongoDB)
```

## Development

Run the backend and frontend in two terminals.

```bash
# Terminal 1: API on http://localhost:5000
cd backend
npm install
npm run seed   # first time only: loads portfolio data into MongoDB
npm run dev

# Terminal 2: site on http://localhost:5173
cd frontend
npm install
npm run dev
```

The Vite dev server proxies `/api` requests to the backend on port 5000.
If the backend is offline or the database is empty, the frontend falls back to built-in sample data.

## Production

```bash
cd frontend && npm run build   # outputs frontend/dist
cd ../backend && npm start     # serves the API and frontend/dist
```
