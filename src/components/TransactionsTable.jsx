import { formatCurrency, formatDate } from '../utils';

export default function TransactionsTable({
  data,
  filters,
  onFilterChange,
  onSortChange,
  role,
  onAddTransaction,
  categories
}) {
  const isAdmin = role === 'admin';

  return (
    <section className="card transactions">
      <div className="transactions-head">
        <div>
          <h3>Transactions</h3>
          <span>Search, filter, and sort financial activity</span>
        </div>
        {isAdmin ? (
          <button type="button" className="btn-primary" onClick={onAddTransaction}>
            Add Mock Transaction
          </button>
        ) : (
          <p className="role-note">Viewer mode: read-only access</p>
        )}
      </div>

      <div className="filters-row">
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
        <div className="empty-panel">
          <h4>No transactions found</h4>
          <p>Try adjusting the filters or search text.</p>
        </div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th className="amount-col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{formatDate(transaction.date)}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.category}</td>
                  <td>
                    <span className={`pill ${transaction.type}`}>{transaction.type}</span>
                  </td>
                  <td className="amount-col">{formatCurrency(transaction.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
