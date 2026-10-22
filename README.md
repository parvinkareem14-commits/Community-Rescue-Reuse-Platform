# 🌟 Community Rescue & Reuse Platform

A modern full-stack web application built to connect community donors with excess unused items, families and students with urgent needs, and volunteer couriers for seamless local doorstep delivery.

---

## 🎯 Key Features & Capabilities

1. **User Roles & Authentication**:
   - **Donor**: Post donations across 7 categories, evaluate smart match compatibility, confirm connections, and earn karma points.
   - **Requester**: Submit item requests with specified urgency levels (`Low`, `Medium`, `High`, `Emergency`) and track fulfillment.
   - **Volunteer Courier**: View open dispatch tasks with pickup/drop locations, claim routes, and advance delivery stages.
   - **Admin**: Master control center with platform analytics, interactive category & urgency distribution charts, request/donation moderation, and user role management.
   - **JWT Authentication** with bcrypt password hashing and role-based route protection.

2. **Smart Matching Engine**:
   - Multi-factor compatibility scoring algorithm:
     - **Category Match (35%)**: Exact & compatible item category alignment.
     - **Keyword & Title Similarity (25%)**: Tokenization and key noun overlap analysis.
     - **Location Proximity (20%)**: Neighborhood and regional proximity weighting.
     - **Urgency Priority Boost (15%)**: Automatic escalation for Emergency and High urgency needs.
     - **Condition & Availability (5%)**: Immediate availability and item quality bonuses.

3. **7-Stage Live Delivery Tracking**:
   - Visual progress timeline:
     $$\text{Requested} \rightarrow \text{Matched} \rightarrow \text{Volunteer Assigned} \rightarrow \text{Picked Up} \rightarrow \text{Out for Delivery} \rightarrow \text{Delivered} \rightarrow \text{Completed}$$
   - Real-time step advancement controls for volunteer couriers and admins.

4. **Community Trust & Gamification System**:
   - **+50 Karma Points** per completed donation.
   - **+100 Volunteer Points** per completed courier delivery.
   - Tier badges: *Community Starter*, *Kind Supporter*, *Active Rescuer*, *Community Pillar*, *Legendary Hero*.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide Icons, Recharts, React Router DOM, Axios |
| **Backend** | Node.js, Express.js, Mongoose, JWT (`jsonwebtoken`), Bcrypt.js |
| **Database** | MongoDB Atlas / Local MongoDB (`mongodb://127.0.0.1:27017/community_rescue`) |

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18+)
- **MongoDB** (Local instance or MongoDB Atlas connection string)

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables (.env)
cp .env.example .env
```

Ensure your `.env` contains:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/community_rescue
JWT_SECRET=super_secret_community_rescue_jwt_key_2026_9981
NODE_ENV=development
```

```bash
# Seed realistic demo data (Users, Donations, Requests, Matches, Deliveries)
npm run seed

# Start backend server
npm start
# Or for live-reload development:
npm run dev
```
Backend API will run at **`http://localhost:5000`** (Health check: `http://localhost:5000/api/health`).

---

### 3. Frontend Setup
```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```
Frontend web application will open at **`http://localhost:3000`**.

---

## 🔑 Demo Accounts for Instant Testing

The login page includes **1-Click Quick-Fill Demo Buttons** for testing all roles:

| Role | Email | Password | Key Permissions |
|---|---|---|---|
| 👑 **Admin** | `admin@rescue.org` | `password123` | Master control console, moderation, user roles, system matching trigger |
| 🎁 **Donor** | `donor@rescue.org` | `password123` | Post items, view suggested matches, confirm match, donor stats |
| 🤝 **Requester** | `requester@rescue.org` | `password123` | Post needs, urgency tagging, track incoming deliveries |
| 🚚 **Volunteer** | `volunteer@rescue.org` | `password123` | Accept open dispatch runs, advance delivery stages, earn courier points |

---

## 📡 REST API Reference

### Authentication
- `POST /api/auth/register` — Register a new account
- `POST /api/auth/login` — Sign in and receive JWT token
- `GET /api/auth/me` — Get current user profile and tier
- `PUT /api/auth/profile` — Update name, phone, location, avatar
- `GET /api/auth/leaderboard` — Community leaderboard top champions

### Donations
- `GET /api/donations` — List donations with filters (category, search, location)
- `GET /api/donations/:id` — Get donation details and related matches
- `GET /api/donations/my-donations` — Get donations by authenticated user
- `POST /api/donations` — Create new donation post (triggers auto-match)
- `PUT /api/donations/:id` — Update donation post
- `DELETE /api/donations/:id` — Delete donation post

### Requests
- `GET /api/requests` — List requests with filters
- `GET /api/requests/urgent` — List emergency and high urgency requests
- `GET /api/requests/:id` — Get request details and matches
- `GET /api/requests/my-requests` — Get requests by authenticated user
- `POST /api/requests` — Create new item request (triggers auto-match)
- `PUT /api/requests/:id` — Update request
- `DELETE /api/requests/:id` — Delete request

### Smart Matching
- `GET /api/matches` — Get calculated matches
- `POST /api/matches/recalculate` — Recalculate platform-wide matches
- `POST /api/matches/confirm` — Confirm match and generate delivery task

### Volunteer & Dispatch
- `GET /api/volunteers/tasks` — List open delivery tasks awaiting pickup
- `GET /api/volunteers/my-tasks` — List tasks claimed by volunteer
- `POST /api/volunteers/accept` — Accept and claim a delivery route
- `GET /api/volunteers/stats` — Get volunteer points and performance stats

### Live Deliveries & Tracking
- `GET /api/deliveries` — List deliveries
- `GET /api/deliveries/:id` — Get delivery timeline by ID
- `PUT /api/deliveries/:id/status` — Advance delivery status (`Picked Up`, `Out for Delivery`, `Delivered`, `Completed`)

### Admin Governance
- `GET /api/admin/dashboard` — Platform statistics & charts aggregation
- `GET /api/admin/users` — List and filter all users
- `PUT /api/admin/users/:id/role` — Modify user role
- `PUT /api/admin/donations/:id/moderate` — Approve or flag donation
- `PUT /api/admin/requests/:id/moderate` — Approve or flag request

---

## 🗄️ MongoDB Collections Architecture

- **`users`**: Authentication credentials, role, karma points, community badges, completed rescue counts.
- **`donations`**: Item details, category, condition, location, availability, status, donor reference.
- **`requests`**: Item needed, urgency level, reason, location, required date, status, requester reference.
- **`matches`**: Pairings between donations and requests, computed match scores and factor breakdowns.
- **`volunteers`**: Courier details, vehicle type, rating, completed delivery counts.
- **`deliveries`**: Multi-stage tracking timeline entries, pickup notes, drop coordinates, volunteer reference.
