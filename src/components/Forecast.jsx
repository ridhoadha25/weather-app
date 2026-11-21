import { useWeather } from "../context/WeatherContext";
import ForecastCard from "./ForecastCard";
import {
  formatDayShort,
  formatDateShort,
  formatTemperature,
  getWeatherIcon,
} from "../utils/weatherUtils";

/**
 * Parse 3-hourly forecast list from OpenWeather API into daily summaries.
 * Groups by UTC date (adjusted by timezoneOffset) and picks:
 *  - representative icon/condition from the midday entry (or first of day)
 *  - max and min temperature across all entries that day
 */
function parseDailyForecast(forecastList, timezoneOffset) {
  const groups = {};

  for (const entry of forecastList) {
    // Localised date string used as grouping key
    const localMs = (entry.dt + timezoneOffset) * 1000;
    const date = new Date(localMs);
    const key = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`;

    if (!groups[key]) {
      groups[key] = { entries: [], key };
    }

    groups[key].entries.push(entry);
  }

  return Object.values(groups)
    .slice(0, 5) // max 5 days
    .map(({ entries }) => {
      // Prefer midday entry (12:00 UTC) for the icon/condition
      const midday = entries.find((e) => {
        const h = new Date((e.dt + timezoneOffset) * 1000).getUTCHours();
        return h >= 11 && h <= 13;
      }) ?? entries[Math.floor(entries.length / 2)];

      const temps = entries.map((e) => e.main.temp);
      const tempMax = Math.max(...temps);
      const tempMin = Math.min(...temps);

      return {
        dt: midday.dt,
        icon: midday.weather[0]?.icon,
        condition: midday.weather[0]?.description,
        tempMax,
        tempMin,
      };
    });
}

function Forecast() {
  const { forecast, weather } = useWeather();

  const timezoneOffset = weather?.timezone ?? 0;

  const dailyData = forecast?.list
    ? parseDailyForecast(forecast.list, timezoneOffset)
    : [];

  return (
    <section>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
            {dailyData.length > 0 ? `${dailyData.length} Days` : "5 Days"}
          </p>

          <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Forecast
          </h3>
        </div>

        <p className="hidden text-sm font-medium text-slate-500 sm:block">
          Daily weather overview
        </p>
      </div>

      {dailyData.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-slate-500">
            Search for a city to see the forecast.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {dailyData.map((item, idx) => {
            const dayLabel = idx === 0 ? "Today" : formatDayShort(item.dt, timezoneOffset);
            const dateLabel = formatDateShort(item.dt, timezoneOffset);
            const conditionLabel = item.condition
              ? item.condition.charAt(0).toUpperCase() + item.condition.slice(1)
              : "--";

            return (
              <ForecastCard
                key={item.dt}
                day={dayLabel}
                date={dateLabel}
                iconUrl={getWeatherIcon(item.icon)}
                condition={conditionLabel}
                tempMax={formatTemperature(item.tempMax)}
                tempMin={formatTemperature(item.tempMin)}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Forecast;