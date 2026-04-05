import { formatCurrency } from '../../utils';
import './InsightsPanel.css';

export default function InsightsPanel({ insights }) {
  return (
    <section className="insights-card">
      <div className="insights-head">
        <h3>Insights</h3>
        <span>Quick observations from current data</span>
      </div>
      {insights.length === 0 ? (
        <p className="insights-empty">No insights available right now.</p>
      ) : (
        <ul className="insights-list">
          {insights.map((insight) => (
            <li key={insight.title} className="insights-item">
              <h4>{insight.title}</h4>
              <p>{insight.text.replace('__VALUE__', formatCurrency(insight.value || 0))}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
