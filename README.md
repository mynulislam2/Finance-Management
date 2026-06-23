# FinTrack — Personal Finance Management App

[![CI/CD](https://github.com/mynulislam2/Finance_Management/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/mynulislam2/Finance_Management/actions/workflows/ci-cd.yml)

A cross-platform mobile application built with **React Native CLI (TypeScript)** and **Supabase** that helps users track expenses, manage income, handle recurring payments, set budgets, and gain financial insights through interactive charts and reports.

## Tech Stack

- **Frontend**: React Native CLI + TypeScript, React Navigation v6, Redux Toolkit, Victory Native (charts)
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

### Prerequisites

- Node.js >= 20
- Android Studio (for Android) or Xcode (for iOS)
- Supabase project

### Setup

```bash
npm install
```

Add your Supabase credentials to `.env.local`:

```
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_ANON_KEY=<your-anon-key>
```

### Run on Android

```bash
npx react-native run-android
```

### Run on iOS

```bash
cd ios && pod install && cd ..
npx react-native run-ios
```

## CI/CD

On every push to `main`, the pipeline runs **typecheck**, **lint**, **tests**, and builds a **release APK** — available as a downloadable artifact from the Actions tab.