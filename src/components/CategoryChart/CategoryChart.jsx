import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { formatCurrency } from '../../utils';
import './CategoryChart.css';

const piePalette = ['#ff7b43', '#ffb238', '#0ea5e9', '#7c3aed', '#059669', '#e11d48'];

export default function CategoryChart({ data }) {
  return (
    <section className="category-chart-card">
      <div className="category-head">
        <h3>Spending Breakdown</h3>
        <span>Expense distribution by category</span>
      </div>
      {data.length === 0 ? (
        <p className="category-empty">No expenses found for selected filters.</p>
      ) : (
        <>
          <div className="category-chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" outerRadius={95} innerRadius={52} paddingAngle={2}>
                  {data.map((entry, index) => (
                    <Cell key={entry.name} fill={piePalette[index % piePalette.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="category-legend">
            {data.map((entry, index) => (
              <div className="category-legend-item" key={entry.name}>
                <span className="category-dot" style={{ backgroundColor: piePalette[index % piePalette.length] }} />
                <span>{entry.name}</span>
                <strong>{formatCurrency(entry.value)}</strong>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
