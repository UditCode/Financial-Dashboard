import { formatCurrency } from '../../utils';
import './SummaryCards.css';

export default function SummaryCards({ totalBalance, income, expenses }) {
  const cards = [
    { label: 'Total Balance', value: totalBalance, className: 'summary-card-balance' },
    { label: 'Income', value: income, className: 'summary-card-income' },
    { label: 'Expenses', value: expenses, className: 'summary-card-expense' }
  ];

  return (
    <section className="summary-grid">
      {cards.map((card) => (
        <article key={card.label} className={`summary-card ${card.className}`}>
          <p>{card.label}</p>
          <h2>{formatCurrency(card.value)}</h2>
        </article>
      ))}
    </section>
  );
}
