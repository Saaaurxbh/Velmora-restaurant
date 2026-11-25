# VELMORA - Restaurant Full Stack App

A full stack restaurant web app where customers browse the menu, order food and book tables, and an admin manages everything from a protected dashboard.

## Live Links
- Frontend: https://velmora-restaurant.vercel.app
- Backend API: https://velmora-restaurant.onrender.com
- GitHub: https://github.com/Saaaurxbh/Velmora-restaurant

Note: the backend is on a free plan, so the first request can take 30-50 seconds.

## Tech Stack
- Frontend: React (Vite), Tailwind CSS, React Router, Axios
- Backend: Node.js, Express
- Database: MongoDB Atlas with Mongoose
- Auth: JWT, bcryptjs, role-based access control (customer / admin)
- Deployment: Vercel (frontend), Render (backend), MongoDB Atlas (database)

## Architecture
React (Vercel) -> Axios -> Express REST API (Render) -> Mongoose -> MongoDB Atlas

## Features
- Register and login with JWT
- Role-based access: customer and admin
- Menu with categories (public)
- Cart and checkout (price is calculated on the server)
- My orders and order status
- Table reservation with cancel
- Admin dashboard: manage orders, reservations, categories and food

## Folder Structure
Velmora-Project/
  client/  (src: api, components, context, pages)
  server/  (src: config, controllers, middleware, models, routes)

## API Endpoints
| Method | Route | Access |
|---|---|---|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET | /api/auth/me | Logged in |
| GET | /api/categories, /api/foods | Public |
| POST/PUT/DELETE | /api/categories, /api/foods | Admin |
| POST | /api/orders | Logged in |
| GET | /api/orders/my | Logged in |
| GET | /api/orders | Admin |
| PUT | /api/orders/:id/status | Admin |
| POST | /api/reservations | Logged in |
| GET | /api/reservations/my | Logged in |
| PUT | /api/reservations/:id/cancel | Owner |
| GET | /api/reservations | Admin |
| PUT | /api/reservations/:id/status | Admin |

## Run Locally
1. Clone the repo.
2. Backend:
   ```
   cd server
   npm install
   ```
   Create `server/.env`:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret
   JWT_EXPIRE=7d
   ```
   Then run `npm run dev`.
3. Frontend:
   ```
   cd client
   npm install
   npm run dev
   ```
   Open http://localhost:5173

## Demo Admin
Create a user via register, then change `role` to `admin` in MongoDB Atlas. Demo credentials can be shared with the teacher separately.