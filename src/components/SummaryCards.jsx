import { formatCurrency } from '../utils';

export default function SummaryCards({ totalBalance, income, expenses }) {
  const cards = [
    { label: 'Total Balance', value: totalBalance, className: 'tone-balance' },
    { label: 'Income', value: income, className: 'tone-income' },
    { label: 'Expenses', value: expenses, className: 'tone-expense' }
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
