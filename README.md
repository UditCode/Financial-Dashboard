# Finance Dashboard UI

A responsive frontend dashboard that demonstrates financial data visualization, transaction exploration, simple role-based behavior, and derived insights using mock data.

## Tech Stack

- React + Vite
- Recharts for visualizations
- Plain CSS with a custom design system

## Features Implemented

### 1. Dashboard Overview
- Summary cards for:
  - Total Balance
  - Income
  - Expenses
- Time-based chart:
  - Daily balance trend (Area Chart)
- Categorical chart:
  - Expense breakdown by category (Pie Chart)

### 2. Transactions Section
- Transaction table with:
  - Date
  - Amount
  - Category
  - Type (income/expense)
  - Description
- Interactions:
  - Search by description/category
  - Filter by type
  - Filter by category
  - Sort by date or amount
- Empty-state handling when filters return no results

### 3. Basic Role-Based UI (Frontend Simulation)
- Role switcher in header (`Viewer` / `Admin`)
- `Viewer`:
  - Read-only mode, cannot mutate transactions
- `Admin`:
  - Can add a mock transaction via `Add Mock Transaction`

### 4. Insights Section
- Highest spending category
- Month-to-month expense comparison
- Additional useful observation based on transaction behavior

### 5. State Management
Managed with React state/hooks:
- `transactions`
- `filters` (search/type/category/sort)
- `role`
- Computed state with `useMemo` for totals, filtered rows, chart data, and insights

### 6. UI/UX Expectations
- Clean readable layout
- Responsive behavior for desktop/tablet/mobile
- Graceful handling of no-data/no-results states

## Project Structure

```text
src/
  components/
    Charts.jsx
    Insights.jsx
    SummaryCards.jsx
    TransactionsTable.jsx
  data/
    mockData.js
  App.jsx
  main.jsx
  styles.css
  utils.js
```

## Setup Instructions

```bash
npm install
npm run dev
```

Build for production check:

```bash
npm run build
```

## Assumptions

- Data is mock/static and frontend-only for evaluation purposes.
- Currency is displayed in USD for consistency.
- "Add Mock Transaction" demonstrates role behavior without backend/API.

## Optional Improvements (if needed)

- Persist transactions to localStorage
- Dark mode toggle
- CSV export for filtered transactions
- Inline edit/delete controls for admin
