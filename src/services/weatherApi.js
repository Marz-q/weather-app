export function getWeatherCondition(code) {
  if (code === 0) return { label: 'Clear sky', icon: 'clear' };
  if (code === 1) return { label: 'Mainly clear', icon: 'partly-cloudy' };
  if (code === 2) return { label: 'Partly cloudy', icon: 'partly-cloudy' };
  if (code === 3) return { label: 'Overcast', icon: 'cloudy' };
  if (code === 45 || code === 48) return { label: 'Foggy', icon: 'fog' };
  if (code >= 51 && code <= 55) return { label: 'Drizzle', icon: 'drizzle' };
  if (code === 56 || code === 57) return { label: 'Freezing drizzle', icon: 'drizzle' };
  if (code >= 61 && code <= 65) return { label: 'Rain', icon: 'rain' };
  if (code === 66 || code === 67) return { label: 'Freezing rain', icon: 'rain' };
  if (code >= 71 && code <= 77) return { label: 'Snow', icon: 'snow' };
  if (code >= 80 && code <= 82) return { label: 'Rain showers', icon: 'rain' };
  if (code === 85 || code === 86) return { label: 'Snow showers', icon: 'snow' };
  if (code >= 95 && code <= 99) return { label: 'Thunderstorm', icon: 'thunderstorm' };
  return { label: 'Moderate', icon: 'partly-cloudy' };
}

export async function fetchWeather(city) {
  if (!city || !city.trim()) {
    throw new Error('Please enter a city name.');
  }

  try {
    // 1. Convert city name to coordinates
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        city.trim()
      )}&count=1&language=en&format=json`
    );

    if (!geoResponse.ok) {
      throw new Error('Failed to reach geocoding service.');
    }

    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error(`City "${city}" not found. Please try another name.`);
    }

    const { latitude, longitude, name, country, admin1 } = geoData.results[0];

    // 2. Fetch weather for those coordinates
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
    );

    if (!weatherResponse.ok) {
      throw new Error('Failed to fetch weather data.');
    }

    const weatherData = await weatherResponse.json();

    if (!weatherData.current || !weatherData.daily) {
      throw new Error('Weather data is currently unavailable.');
    }

    return {
      cityName: name,
      country: country || admin1 || '',
      current: {
        temp: Math.round(weatherData.current.temperature_2m),
        feelsLike: Math.round(weatherData.current.apparent_temperature),
        humidity: weatherData.current.relative_humidity_2m,
        windSpeed: Math.round(weatherData.current.wind_speed_10m),
        weatherCode: weatherData.current.weather_code,
      },
      forecast: weatherData.daily.time.slice(1, 6).map((date, index) => {
        // day index starts from 1 so we get the upcoming 5 days (excluding today)
        const dayIdx = index + 1;
        return {
          date,
          weatherCode: weatherData.daily.weather_code[dayIdx],
          maxTemp: Math.round(weatherData.daily.temperature_2m_max[dayIdx]),
          minTemp: Math.round(weatherData.daily.temperature_2m_min[dayIdx]),
        };
      }),
    };
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error('Network error. Please check your internet connection.');
    }
    throw error;
  }
}
