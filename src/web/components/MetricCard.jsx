export const MetricCard = ({ label, value, sub }) => (
  <div className="metric-card">
    <div className="label">{label}</div>
    <div className="value">{value}</div>
    {sub ? <div className="sub">{sub}</div> : null}
  </div>
);
