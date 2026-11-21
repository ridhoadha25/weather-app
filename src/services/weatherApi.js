const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const BASE_URL = "https://api.openweathermap.org/data/2.5";

// ─── Helper ──────────────────────────────────────────────────────────────────

async function handleResponse(response) {
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("City not found. Please check the name and try again.");
    }

    if (response.status === 401) {
      throw new Error("Invalid API key. Please check your configuration.");
    }

    if (response.status === 429) {
      throw new Error("Too many requests. Please wait a moment and try again.");
    }

    throw new Error("Failed to fetch weather data. Please try again.");
  }

  return response.json();
}

// ─── By City Name ────────────────────────────────────────────────────────────

/**
 * Get current weather by city name
 * @param {string} city - City name
 */
export async function getCurrentWeather(city) {
  if (!city?.trim()) {
    throw new Error("City name is required.");
  }

  const url = `${BASE_URL}/weather?q=${encodeURIComponent(city.trim())}&appid=${API_KEY}&units=metric&lang=en`;
  const response = await fetch(url);

  return handleResponse(response);
}

/**
 * Get 5-day weather forecast by city name
 * @param {string} city - City name
 */
export async function getForecast(city) {
  if (!city?.trim()) {
    throw new Error("City name is required.");
  }

  const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city.trim())}&appid=${API_KEY}&units=metric&lang=en`;
  const response = await fetch(url);

  return handleResponse(response);
}

// ─── By Coordinates (Geolocation) ────────────────────────────────────────────

/**
 * Get current weather by geographic coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 */
export async function getCurrentWeatherByCoords(lat, lon) {
  if (lat === undefined || lon === undefined) {
    throw new Error("Coordinates are required.");
  }

  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`;
  const response = await fetch(url);

  return handleResponse(response);
}

/**
 * Get 5-day weather forecast by geographic coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 */
export async function getForecastByCoords(lat, lon) {
  if (lat === undefined || lon === undefined) {
    throw new Error("Coordinates are required.");
  }

  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`;
  const response = await fetch(url);

  return handleResponse(response);
}

