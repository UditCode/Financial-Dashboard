import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatCurrency } from '../../utils';
import './TrendChart.css';

export default function TrendChart({ data }) {
  return (
    <section className="chart-card trend-chart-card">
      <div className="chart-head">
        <h3>Balance Trend</h3>
        <span>Daily closing balance</span>
      </div>
      {data.length === 0 ? (
        <p className="chart-empty">No data available for trend analysis.</p>
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
