# CampusHub

CampusHub is a production-style campus engagement platform built with React, Vite, Tailwind CSS, Express, MongoDB Atlas, and JWT authentication. It includes student-facing event and club discovery flows plus an admin workspace for managing platform data.

## Features

- Student registration and login
- Protected student dashboard
- Event browsing, event details, and event registrations
- Club browsing and club details
- My Events, My Clubs, and Profile pages
- Admin login and protected admin dashboard
- Admin management for events, clubs, students, and registrations
- Responsive SaaS-style UI with shared cards, buttons, loading states, empty states, and API error states
- Centralized frontend API configuration using `VITE_API_URL`

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router, Axios, lucide-react
- Backend: Express.js, MongoDB Atlas, JWT, bcryptjs

## Project Structure

```text
AWD/
  campushub/   Frontend React application
  server/      Express API application
```

## Frontend Setup

```bash
cd campushub
npm install
npm run dev
```

Create a `.env` file in `campushub/` when the API is not running on the default local URL:

```env
VITE_API_URL=http://localhost:5000/api
```

If `VITE_API_URL` is not provided, the frontend falls back to `http://localhost:5000/api`.

## Backend Setup

```bash
cd server
npm install
npm run dev
```

Create a `.env` file in `server/`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
```

## Production Build

```bash
cd campushub
npm run build
```

The production frontend output is generated in `campushub/dist`.

## Deployment Notes

Frontend deployment:

- Set the build command to `npm run build`.
- Set the output directory to `dist`.
- Set `VITE_API_URL` to the deployed backend API URL, ending with `/api`.
- The included `vercel.json` supports client-side routing fallback for deployed SPA routes.

Backend deployment:

- Deploy the `server/` directory as a Node.js service.
- Set the start command to `npm start`.
- Configure `MONGO_URI`, `JWT_SECRET`, and `PORT` in the hosting provider environment.
- Ensure the frontend deployment URL is allowed by the backend CORS policy if the backend is later restricted.
