import { Area, AreaChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatCurrency } from '../utils';

const piePalette = ['#ff7b43', '#ffb238', '#0ea5e9', '#7c3aed', '#059669', '#e11d48'];

export function TrendChart({ data }) {
  return (
    <section className="card chart-card">
      <div className="card-head">
        <h3>Balance Trend</h3>
        <span>Daily closing balance</span>
      </div>
      {data.length === 0 ? (
        <p className="empty-state">No data available for trend analysis.</p>
      ) : (
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <XAxis dataKey="label" tickLine={false} axisLine={false} />
              <YAxis tickFormatter={(val) => `$${val}`} tickLine={false} axisLine={false} width={58} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Area type="monotone" dataKey="balance" stroke="#0369a1" fill="url(#balanceGradient)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}

export function CategoryChart({ data }) {
  return (
    <section className="card chart-card">
      <div className="card-head">
        <h3>Spending Breakdown</h3>
        <span>Expense distribution by category</span>
      </div>
      {data.length === 0 ? (
        <p className="empty-state">No expenses found for selected filters.</p>
      ) : (
        <>
          <div className="chart-wrap pie-wrap">
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
          <div className="legend">
            {data.map((entry, idx) => (
              <div className="legend-item" key={entry.name}>
                <span className="dot" style={{ backgroundColor: piePalette[idx % piePalette.length] }} />
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
