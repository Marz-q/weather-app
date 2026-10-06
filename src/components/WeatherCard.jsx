import { getWeatherCondition } from '../services/weatherApi';

export function WeatherIcon({ code, size = 48 }) {
  if (code === 0) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" fill="#f59e0b" stroke="#d97706" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    );
  }

  if (code === 1 || code === 2) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v2M4.93 4.93l1.41 1.41M2 12h2" stroke="#d97706" />
        <circle cx="9" cy="9" r="3" fill="#f59e0b" stroke="#d97706" />
        <path d="M17.5 19H9a5 5 0 0 1-1-9.9 5.5 5.5 0 0 1 10.5 1.9 4 4 0 0 1-1 8z" fill="#e0f2fe" stroke="#0284c7" />
      </svg>
    );
  }

  if (code === 3) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a5 5 0 0 1-1-9.9 5.5 5.5 0 0 1 10.5 1.9 4 4 0 0 1-1 8z" />
      </svg>
    );
  }

  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 15H9a5 5 0 0 1-1-9.9 5.5 5.5 0 0 1 10.5 1.9 4 4 0 0 1-1 8z" fill="#e0f2fe" />
        <path d="M8 18v3M12 18v3M16 18v3" stroke="#0284c7" />
      </svg>
    );
  }

  if (code >= 95) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 14H9a5 5 0 0 1-1-9.9 5.5 5.5 0 0 1 10.5 1.9 4 4 0 0 1-1 8z" fill="#e0f2fe" />
        <polygon points="13 14 10 19 14 19 11 23" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
      </svg>
    );
  }

  if ((code >= 71 && code <= 77) || code === 85 || code === 86) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 15H9a5 5 0 0 1-1-9.9 5.5 5.5 0 0 1 10.5 1.9 4 4 0 0 1-1 8z" fill="#f1f5f9" stroke="#64748b" />
        <circle cx="8" cy="19" r="1.5" fill="#38bdf8" />
        <circle cx="12" cy="19" r="1.5" fill="#38bdf8" />
        <circle cx="16" cy="19" r="1.5" fill="#38bdf8" />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14h16M3 18h18M6 10h12" />
    </svg>
  );
}

function WeatherCard({ data }) {
  const { cityName, country, current } = data;
  const condition = getWeatherCondition(current.weatherCode);

  return (
    <div className="weather-card">
      <div className="card-header">
        <div>
          <h2 className="city-name">{cityName}</h2>
          {country && <p className="country-name">{country}</p>}
        </div>
        <div className="condition-badge">
          <WeatherIcon code={current.weatherCode} size={42} />
          <span className="condition-text">{condition.label}</span>
        </div>
      </div>

      <div className="temp-display">
        <span className="current-temp">{current.temp}°C</span>
      </div>

      <div className="weather-details-grid">
        <div className="detail-item">
          <span className="detail-label">Feels like</span>
          <span className="detail-value">{current.feelsLike}°C</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{current.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind</span>
          <span className="detail-value">{current.windSpeed} km/h</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
