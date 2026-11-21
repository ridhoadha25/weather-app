import {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";

import {
  getCurrentWeather,
  getCurrentWeatherByCoords,
  getForecast,
  getForecastByCoords,
} from "../services/weatherApi";

// ─── State & Reducer ─────────────────────────────────────────────────────────

const initialState = {
  weather: null,
  forecast: null,
  loading: false,
  error: null,
  city: "",
};

function weatherReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true, error: null };

    case "SET_WEATHER":
      return {
        ...state,
        loading: false,
        error: null,
        weather: action.weather,
        forecast: action.forecast,
        city: action.city,
      };

    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.message,
        weather: null,
        forecast: null,
      };

    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

const WeatherContext = createContext(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function WeatherProvider({ children }) {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  /**
   * Fetch weather data by city name
   */
  const searchByCity = useCallback(async (city) => {
    if (!city?.trim()) return;

    dispatch({ type: "SET_LOADING" });

    try {
      const [weather, forecast] = await Promise.all([
        getCurrentWeather(city),
        getForecast(city),
      ]);

      dispatch({
        type: "SET_WEATHER",
        weather,
        forecast,
        city: weather.name,
      });
    } catch (err) {
      dispatch({ type: "SET_ERROR", message: err.message });
    }
  }, []);

  /**
   * Fetch weather data by geolocation coordinates
   */
  const searchByCoords = useCallback(async (lat, lon) => {
    dispatch({ type: "SET_LOADING" });

    try {
      const [weather, forecast] = await Promise.all([
        getCurrentWeatherByCoords(lat, lon),
        getForecastByCoords(lat, lon),
      ]);

      dispatch({
        type: "SET_WEATHER",
        weather,
        forecast,
        city: weather.name,
      });
    } catch (err) {
      dispatch({ type: "SET_ERROR", message: err.message });
    }
  }, []);

  return (
    <WeatherContext.Provider
      value={{ ...state, searchByCity, searchByCoords }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useWeather() {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error("useWeather must be used inside a <WeatherProvider>");
  }

  return context;
}
