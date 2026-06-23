# FinTrack — Personal Finance Management App

A cross-platform mobile application built with **React Native (TypeScript)** and **Supabase** that helps users track expenses, manage income, handle recurring payments, set budgets, and gain financial insights through interactive charts and reports.

## Tech Stack

- **Frontend**: React Native + TypeScript, React Navigation v6, Redux Toolkit, Victory Native (charts)
- **Backend**: Supabase (PostgreSQL + Row Level Security), Supabase Auth
- **Key Libraries**: date-fns, React Native Vector Icons

## Features

- **Auth** — Email/password sign-up, login, password reset with persisted sessions
- **Dashboard** — Balance overview, income vs expense cards, budget progress, recent transactions
- **Expense Management** — Full CRUD with categories, payment methods, notes
- **Income Tracking** — Multiple income sources with date-based tracking
- **Recurring Payments** — Daily/weekly/monthly/yearly frequencies with auto next-date calculation
- **Budget Management** — Per-category monthly limits with real-time spending progress
- **Analytics** — Category pie chart, monthly trend bar chart, income vs expense comparison
- **Reports** — Monthly/yearly summaries with savings and top category insights
- **Profile** — Editable user profile with currency preference

## Architecture

PostgreSQL on Supabase with Row Level Security ensures users can only access their own data. The Supabase client handles auth session persistence and token refresh automatically. Redux Toolkit manages client-side state across all modules.

## Project Structure

```
src/
├── components/     # Reusable UI (common, charts, transactions)
├── screens/        # Auth, Dashboard, Expenses, Income, Recurring,
│                   # Budget, Analytics, Reports, Profile
├── navigation/     # Root, Auth, and Bottom Tab navigators
├── services/       # Supabase queries (auth, db, profile)
├── hooks/          # useAuth, useExpenses, useBudgets
├── store/          # Redux slices (auth, expense, budget)
├── types/          # TypeScript interfaces
└── lib/            # Supabase client initialization
```

## Getting Started

```bash
npm install
```

Add your Supabase credentials to `.env.local`:

```
EXPO_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

```bash
npx expo start
```
