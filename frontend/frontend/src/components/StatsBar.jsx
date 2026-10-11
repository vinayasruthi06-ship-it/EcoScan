import { Target, Trees, CheckCircle, Zap } from 'lucide-react';

export default function StatsBar() {
  const stats = [
    {
      icon: <Target className="stat-icon" />,
      value: '100%',
      label: 'Client-Side Photo Intake'
    },
    {
      icon: <Trees className="stat-icon" />,
      value: '14.2 Tons',
      label: 'Waste Diverted'
    },
    {
      icon: <CheckCircle className="stat-icon" />,
      value: '52,000+',
      label: 'Items Logged'
    },
    {
      icon: <Zap className="stat-icon" />,
      value: '< 0.5s',
      label: 'Instant Photo Intake'
    }
  ];

  return (
    <div id="impact" className="stats-strip">
      <div className="stats-container">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-item">
            <div className="stat-icon-wrapper">{stat.icon}</div>
            <div className="stat-info">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
