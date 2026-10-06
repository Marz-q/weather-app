import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import Loading from './components/Loading';
import { fetchWeather } from './services/weatherApi';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadWeather = async (city) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err) {
      setError(err.message || 'Could not load weather. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather('London');
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Weather App</h1>
        <p className="app-subtitle">Check real-time weather and 5-day forecast</p>
      </header>

      <main className="app-content">
        <SearchBar onSearch={loadWeather} />

        {error && (
          <div className="error-message">
            <span>{error}</span>
          </div>
        )}

        {loading && <Loading />}

        {!loading && weather && (
          <div className="weather-results">
            <WeatherCard data={weather} />
            <Forecast forecast={weather.forecast} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
