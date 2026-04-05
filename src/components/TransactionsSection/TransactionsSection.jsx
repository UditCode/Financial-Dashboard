import { useState } from 'react';
import { formatCurrency, formatDate } from '../../utils';
import './TransactionsSection.css';

const today = new Date().toISOString().slice(0, 10);

export default function TransactionsSection({
  data,
  filters,
  onFilterChange,
  onSortChange,
  role,
  onAddTransaction,
  categories
}) {
  const isAdmin = role === 'admin';
  const writableCategories = categories.filter((category) => category !== 'All');
  const [formState, setFormState] = useState({
    type: 'expense',
    description: '',
    amount: '',
    category: writableCategories[0] || 'Utilities',
    date: today
  });

  const handleFormChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formState.description.trim()) {
      return;
    }

    const parsedAmount = Number(formState.amount);
    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      return;
    }

    onAddTransaction({
      ...formState,
      amount: parsedAmount
    });

    setFormState((prev) => ({
      ...prev,
      description: '',
      amount: ''
    }));
  };

  return (
    <section className="transactions-card">
      <div className="transactions-head">
        <div>
          <h3>Transactions</h3>
          <span>Search, filter, sort, and add financial activity</span>
        </div>
        {!isAdmin && <p className="transactions-role-note">Viewer mode: read-only access</p>}
      </div>

      {isAdmin && (
        <form className="transactions-add-form" onSubmit={handleSubmit}>
          <h4>Add Transaction</h4>
          <div className="transactions-add-grid">
            <select value={formState.type} onChange={(e) => handleFormChange('type', e.target.value)}>
              <option value="expense">Expense</option>
              <option value="income">Credit (Income)</option>
            </select>

            <input
              type="text"
              placeholder="Description"
              value={formState.description}
              onChange={(e) => handleFormChange('description', e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Amount"
              value={formState.amount}
              onChange={(e) => handleFormChange('amount', e.target.value)}
              min="0.01"
              step="0.01"
              required
            />

            <select value={formState.category} onChange={(e) => handleFormChange('category', e.target.value)}>
              {writableCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={formState.date}
              onChange={(e) => handleFormChange('date', e.target.value)}
              required
            />

            <button type="submit" className="transactions-btn">
              Add Entry
            </button>
          </div>
        </form>
      )}

      <div className="transactions-filters">
        <input
          type="search"
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
          placeholder="Search by description/category"
        />

        <select value={filters.type} onChange={(e) => onFilterChange('type', e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select value={filters.category} onChange={(e) => onFilterChange('category', e.target.value)}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select value={filters.sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Highest Amount</option>
          <option value="amount-asc">Lowest Amount</option>
        </select>
      </div>

      {data.length === 0 ? (
        <div className="transactions-empty-panel">
          <h4>No transactions found</h4>
          <p>Try adjusting the filters or search text.</p>
        </div>
      ) : (
        <div className="transactions-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th className="transactions-amount-col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{formatDate(transaction.date)}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.category}</td>
                  <td>
                    <span className={`transactions-pill ${transaction.type}`}>{transaction.type}</span>
                  </td>
                  <td className="transactions-amount-col">{formatCurrency(transaction.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
