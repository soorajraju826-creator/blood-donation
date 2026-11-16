# LifeLine — Blood Donation Management System (MERN)

A classroom-ready MERN project with public user registration/login, donor registration/search, blood requests, and a protected admin dashboard.

## Requirements
- Node.js 18+
- MongoDB local or Atlas

## 1. Configure the backend
```bash
cd server
npm install
```
Copy `.env.example` to `.env` and set `MONGO_URI`, `JWT_SECRET`, and admin seed credentials.

Create the first admin:
```bash
npm run seed:admin
```
The seed script creates or promotes the configured account to `admin`. It hashes the password. Never put these credentials in frontend code or commit your `.env`.

Start backend:
```bash
npm run dev
```
API runs at `http://localhost:5000`.

## 2. Start frontend
Open a second terminal:
```bash
cd client
npm install
npm run dev
```
Open the Vite URL shown (normally `http://localhost:5173`).

## Demo flow
1. Register a normal user at `/register`.
2. Log in at `/login`; normal users go to `/dashboard`.
3. Register as a donor and submit a blood request.
4. Log in with the admin credentials configured in `server/.env`; the same `/login` page redirects admins to `/admin/dashboard`.
5. Admin can review users, donors and requests, and update request status.

There is intentionally no public Admin Login button. `/admin/dashboard` is protected by frontend route guards AND backend admin middleware. Hiding a URL is not security; API authorization is enforced server-side.

## Important
- This is an educational/demo project, not a production medical or emergency service.
- Donor availability and eligibility must be verified before any real-world use.
- Passwords are hashed with bcrypt; JWT secret must be private.
- For production, add email verification, rate limiting, audit logs, HTTPS, stronger validation, and privacy/consent workflows.
