import { WeatherIcon } from './WeatherCard';
import { getWeatherCondition } from '../services/weatherApi';

function formatDayName(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

function Forecast({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="forecast-card">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-list">
        {forecast.map((day) => {
          const condition = getWeatherCondition(day.weatherCode);
          return (
            <div key={day.date} className="forecast-item">
              <span className="forecast-day">{formatDayName(day.date)}</span>
              <div className="forecast-icon">
                <WeatherIcon code={day.weatherCode} size={28} />
              </div>
              <span className="forecast-condition">{condition.label}</span>
              <div className="forecast-temp">
                <span className="max-temp">{day.maxTemp}°</span>
                <span className="temp-divider">/</span>
                <span className="min-temp">{day.minTemp}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;
