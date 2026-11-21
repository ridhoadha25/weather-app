import { MapPin } from "lucide-react";

import { useWeather } from "../context/WeatherContext";
import WeatherDetails from "./WeatherDetails";
import {
  formatTemperature,
  formatDate,
  getWeatherIcon,
  getCountryName,
} from "../utils/weatherUtils";

function WeatherCard() {
  const { weather } = useWeather();

  // Belum ada data — tampilkan placeholder
  if (!weather) {
    return (
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex min-h-48 items-center justify-center p-8">
          <p className="text-center text-slate-500">
            Search for a city to see the current weather.
          </p>
        </div>
      </section>
    );
  }

  const timezoneOffset = weather.timezone ?? 0;

  const city        = weather.name;
  const country     = getCountryName(weather.sys?.country);
  const dateStr     = formatDate(weather.dt, timezoneOffset);
  const temp        = formatTemperature(weather.main?.temp);
  const feelsLike   = formatTemperature(weather.main?.feels_like);
  const tempMax     = formatTemperature(weather.main?.temp_max);
  const tempMin     = formatTemperature(weather.main?.temp_min);
  const condition   = weather.weather?.[0]?.description;
  const iconCode    = weather.weather?.[0]?.icon;
  const iconUrl     = getWeatherIcon(iconCode);

  // Capitalise first letter of description
  const conditionLabel = condition
    ? condition.charAt(0).toUpperCase() + condition.slice(1)
    : "--";

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-center">

          {/* Location & Main Temp */}
          <div>
            <div className="mb-2 flex items-center gap-2 text-slate-800">
              <MapPin size={18} className="text-sky-700" />
              <span className="text-lg font-semibold tracking-wide">
                {city}, {country}
              </span>
            </div>

            <p className="mb-6 text-sm text-slate-500">
              {dateStr}
            </p>

            <div className="flex items-center gap-6">
              {iconUrl && (
                <img
                  src={iconUrl}
                  alt={conditionLabel}
                  className="-ml-3 h-28 w-28 drop-shadow-md"
                />
              )}

              <div>
                <div className="flex items-start">
                  <span className="text-7xl font-bold tracking-tighter text-slate-900 sm:text-8xl">
                    {temp.replace("°", "")}
                  </span>
                  <span className="mt-3 text-4xl font-light text-slate-400">
                    °C
                  </span>
                </div>
                
                <p className="mt-2 text-lg font-semibold tracking-wide text-slate-700">
                  {conditionLabel}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Feels like {feelsLike}C
                </p>
              </div>
            </div>
          </div>

          {/* High / Low */}
          <div className="flex gap-3 md:flex-col md:gap-4 md:items-end md:text-right">
            <div className="min-w-[110px] rounded-2xl bg-slate-50 p-4">
              <p className="mb-1 text-xs uppercase tracking-[0.15em] text-slate-400">
                High
              </p>
              <p className="text-2xl font-bold text-slate-800">
                {tempMax}C
              </p>
            </div>

            <div className="min-w-[110px] rounded-2xl bg-slate-50 p-4">
              <p className="mb-1 text-xs uppercase tracking-[0.15em] text-slate-400">
                Low
              </p>
              <p className="text-2xl font-bold text-slate-500">
                {tempMin}C
              </p>
            </div>
          </div>

        </div>

        <WeatherDetails />
      </div>
    </section>
  );
}

export default WeatherCard;