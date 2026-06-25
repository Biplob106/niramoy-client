# নিরাময় (Niramoy) — Client

> MediCare Connect — একটি ডিজিটাল হেলথকেয়ার অ্যাপয়েন্টমেন্ট প্ল্যাটফর্ম। রোগী অভিজ্ঞ ডাক্তার খুঁজে অ্যাপয়েন্টমেন্ট নেয়, অনলাইনে পেমেন্ট করে, প্রেসক্রিপশন ও রিভিউ ম্যানেজ করে। ডাক্তার ও অ্যাডমিনের জন্য আলাদা ড্যাশবোর্ড।

This is the **frontend** of Niramoy, built with Next.js (App Router).

## Live Links

- **Client (Live):** _add your deployed client URL here_
- **Server (Live):** _add your deployed server URL here_
- **Server Repo:** _add your server repo URL here_

## Features

- 🔐 Firebase authentication (email/password + Google) with JWT-backed private routes that survive page refresh
- 👤 Role-based dashboards (patient / doctor / admin) rendered from a single `DashboardLayout`
- 🔎 Find Doctors page with search, sort, pagination and a **card ↔ table layout switch**
- 📅 Appointment booking with Stripe payment (separate card number / expiry / CVC fields)
- 🩺 Doctor tools: appointment requests (accept/reject/complete), prescription writing, profile and **schedule management** (available days & slots)
- 🛠️ Admin tools: manage users (suspend/delete), verify/reject doctors, view all appointments, payment management, and **Recharts analytics**
- ⭐ Patient reviews (add/edit/delete) that feed the homepage testimonials, plus payment history
- 🌗 Dark / Light theme toggle (DaisyUI `data-theme`)
- 📱 Fully responsive (mobile / tablet / desktop), Bengali-first UI
- 🔔 Toast feedback on every create/update/delete, loading spinners, and a custom 404 page
- 🏷️ Dynamic per-page titles (metadata on server pages, `useTitle` hook on client pages)

## Tech Stack

- **Framework:** Next.js (App Router, JavaScript, `src/` directory)
- **Styling:** Tailwind CSS + DaisyUI
- **Auth:** Firebase Authentication
- **Data:** Axios (`axiosPublic` for public, `useAxiosSecure` for private)
- **Forms:** react-hook-form
- **Animation:** Framer Motion
- **Charts:** Recharts
- **Payments:** Stripe (`@stripe/react-stripe-js`)
- **Notifications:** react-hot-toast

## Project Structure

```
src/
├── app/                 # App Router pages
│   ├── about/           # About Us (server page + animated client content)
│   ├── contact/         # Contact Us
│   ├── dashboard/       # Role-based dashboard pages
│   ├── doctors/         # Find doctors, details, booking
│   ├── login/ register/ # Auth pages
│   ├── layout.js        # Root layout (Navbar, Footer, Toaster)
│   └── not-found.js     # Custom 404
├── components/          # Navbar, Footer, DashboardLayout, CheckoutForm, ThemeToggle, ...
├── hooks/               # useAuth, useAxiosSecure, useRole, useTitle
├── lib/                 # axios, firebase, stripe
└── providers/           # AuthProvider
```

## Getting Started

### Prerequisites

- Node.js 18+
- A running instance of the Niramoy server
- Firebase project (Authentication enabled) and Stripe keys

### Installation

```bash
git clone <client-repo-url>
cd niramoy-client
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000

# Firebase
NEXT_PUBLIC_apiKey=your_firebase_api_key
NEXT_PUBLIC_authDomain=your_firebase_auth_domain
NEXT_PUBLIC_projectId=your_firebase_project_id
NEXT_PUBLIC_storageBucket=your_firebase_storage_bucket
NEXT_PUBLIC_messagingSenderId=your_firebase_sender_id
NEXT_PUBLIC_appId=your_firebase_app_id

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Run

```bash
npm run dev      # development (http://localhost:3000)
npm run build    # production build
npm run start    # serve production build
```

## JWT Authentication Flow

This documents how authentication flows end-to-end (Challenge 3):

1. **Firebase login** — the user signs in with email/password or Google. `AuthProvider` listens via `onAuthStateChanged`.
2. **`/jwt` issues a token** — once a user is detected, `AuthProvider` posts the user's email to the server's `POST /jwt`, which signs and returns a JWT.
3. **Stored in localStorage** — the returned token is saved as `access-token` in `localStorage` (and removed on logout).
4. **`useAxiosSecure` attaches it** — every private request goes through the `useAxiosSecure` Axios instance, whose request interceptor reads `access-token` and sets `Authorization: Bearer <token>`. Public/unauthenticated calls use `axiosPublic`.
5. **Backend verifies** — the server's `verifyToken` middleware validates the JWT on protected routes; `verifyAdmin` runs after it and checks the user's `role` in the `users` collection, returning `403` for non-admins.

`PrivateRoute` keeps the user on protected pages across refreshes by waiting for Firebase's auth state to resolve (showing a spinner) before deciding whether to redirect to `/login`.

## Author

Built as the MediCare Connect (Niramoy) assignment.
