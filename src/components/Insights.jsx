import { formatCurrency } from '../utils';

export default function Insights({ insights }) {
  return (
    <section className="card insights">
      <div className="card-head">
        <h3>Insights</h3>
        <span>Quick observations from current data</span>
      </div>
      {insights.length === 0 ? (
        <p className="empty-state">No insights available right now.</p>
      ) : (
        <ul>
          {insights.map((insight) => (
            <li key={insight.title}>
              <h4>{insight.title}</h4>
              <p>{insight.text.replace('__VALUE__', formatCurrency(insight.value || 0))}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
