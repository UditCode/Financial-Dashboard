import { useMemo, useState } from 'react';
import SummaryCards from './components/SummaryCards';
import { CategoryChart, TrendChart } from './components/Charts';
import TransactionsTable from './components/TransactionsTable';
import Insights from './components/Insights';
import { categoryOptions, initialTransactions, roleOptions } from './data/mockData';
import { getMonthKey } from './utils';

function buildTrendData(transactions) {
  const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
  let runningBalance = 0;

  return sorted.map((transaction) => {
    runningBalance += transaction.type === 'income' ? transaction.amount : -transaction.amount;
    return {
      label: new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      balance: Number(runningBalance.toFixed(2))
    };
  });
}

function buildCategoryData(transactions) {
  const expenseMap = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {});

  return Object.entries(expenseMap)
    .map(([name, value]) => ({ name, value: Number(value.toFixed(2)) }))
    .sort((a, b) => b.value - a.value);
}

function buildInsights(transactions) {
  if (!transactions.length) {
    return [];
  }

  const expenseByCategory = buildCategoryData(transactions);
  const highest = expenseByCategory[0];

  const monthGroups = transactions.reduce((acc, transaction) => {
    const monthKey = getMonthKey(transaction.date);
    if (!acc[monthKey]) {
      acc[monthKey] = { income: 0, expense: 0 };
    }

    acc[monthKey][transaction.type] += transaction.amount;
    return acc;
  }, {});

  const months = Object.keys(monthGroups).sort();
  const latestMonth = months[months.length - 1];
  const prevMonth = months[months.length - 2];

  const latestExpense = latestMonth ? monthGroups[latestMonth].expense : 0;
  const prevExpense = prevMonth ? monthGroups[prevMonth].expense : 0;
  const diff = Number((latestExpense - prevExpense).toFixed(2));

  return [
    highest
      ? {
          title: 'Highest Spending Category',
          text: `You spent the most on ${highest.name}: __VALUE__.`,
          value: highest.value
        }
      : null,
    {
      title: 'Monthly Comparison',
      text: prevMonth
        ? `Expense change from ${prevMonth} to ${latestMonth} is ${diff >= 0 ? 'up' : 'down'} by __VALUE__.`
        : `Only one month of data exists so far with expenses totaling __VALUE__.`,
      value: Math.abs(prevMonth ? diff : latestExpense)
    },
    {
      title: 'Useful Observation',
      text: 'Income transactions are less frequent but higher in value than expenses, which helps preserve positive cash flow.',
      value: 0
    }
  ].filter(Boolean);
}

export default function App() {
  const [role, setRole] = useState('viewer');
  const [transactions, setTransactions] = useState(initialTransactions);
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    category: 'All',
    sortBy: 'date-desc'
  });

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (filters.search.trim()) {
      const q = filters.search.trim().toLowerCase();
      result = result.filter(
        (transaction) =>
          transaction.description.toLowerCase().includes(q) || transaction.category.toLowerCase().includes(q)
      );
    }

    if (filters.type !== 'all') {
      result = result.filter((transaction) => transaction.type === filters.type);
    }

    if (filters.category !== 'All') {
      result = result.filter((transaction) => transaction.category === filters.category);
    }

    const [sortField, order] = filters.sortBy.split('-');
    result.sort((a, b) => {
      const modifier = order === 'asc' ? 1 : -1;
      if (sortField === 'amount') {
        return (a.amount - b.amount) * modifier;
      }
      return (new Date(a.date) - new Date(b.date)) * modifier;
    });

    return result;
  }, [transactions, filters]);

  const totals = useMemo(() => {
    const income = transactions
      .filter((transaction) => transaction.type === 'income')
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    const expenses = transactions
      .filter((transaction) => transaction.type === 'expense')
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    return {
      income: Number(income.toFixed(2)),
      expenses: Number(expenses.toFixed(2)),
      totalBalance: Number((income - expenses).toFixed(2))
    };
  }, [transactions]);

  const trendData = useMemo(() => buildTrendData(filteredTransactions), [filteredTransactions]);
  const categoryData = useMemo(() => buildCategoryData(filteredTransactions), [filteredTransactions]);
  const insights = useMemo(() => buildInsights(filteredTransactions), [filteredTransactions]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const addMockTransaction = () => {
    if (role !== 'admin') {
      return;
    }

    const now = new Date();
    const newTransaction = {
      id: `T-${Math.floor(Math.random() * 100000)}`,
      date: now.toISOString().slice(0, 10),
      description: 'Admin Added - Office Supplies',
      category: 'Utilities',
      type: 'expense',
      amount: Number((Math.random() * 120 + 10).toFixed(2))
    };

    setTransactions((prev) => [newTransaction, ...prev]);
  };

  return (
    <div className="app-shell">
      <header className="top-bar">
        <div>
          <p className="eyebrow">Finance Monitor</p>
          <h1>Personal Finance Dashboard</h1>
          <p className="subtitle">Track your money, review transactions, and spot spending signals.</p>
        </div>

        <label className="role-switcher" htmlFor="role">
          <span>Role</span>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
            {roleOptions.map((option) => (
              <option key={option} value={option}>
                {option.toUpperCase()}
              </option>
            ))}
          </select>
        </label>
      </header>

      <SummaryCards totalBalance={totals.totalBalance} income={totals.income} expenses={totals.expenses} />

      <section className="grid-2">
        <TrendChart data={trendData} />
        <CategoryChart data={categoryData} />
      </section>

      <TransactionsTable
        data={filteredTransactions}
        filters={filters}
        onFilterChange={handleFilterChange}
        onSortChange={(value) => handleFilterChange('sortBy', value)}
        role={role}
        onAddTransaction={addMockTransaction}
        categories={categoryOptions}
      />

      <Insights insights={insights} />
    </div>
  );
}
