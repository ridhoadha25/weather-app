import {
  Cloud,
  Droplets,
  Eye,
  Wind,
} from "lucide-react";

import { useWeather } from "../context/WeatherContext";
import {
  formatWindSpeed,
  formatVisibility,
  getWindDirection,
} from "../utils/weatherUtils";

function WeatherDetails() {
  const { weather } = useWeather();

  const humidity     = weather?.main?.humidity ?? "--";
  const windSpeed    = weather?.wind?.speed;
  const windDeg      = weather?.wind?.deg;
  const visibility   = weather?.visibility;
  const cloudiness   = weather?.clouds?.all ?? "--";

  const windLabel = windSpeed != null
    ? `${formatWindSpeed(windSpeed)} ${getWindDirection(windDeg)}`
    : "--";

  return (
    <div className="mt-8 grid grid-cols-2 gap-3 border-t border-slate-100 pt-6 sm:grid-cols-4">
      <WeatherDetail
        icon={<Droplets size={20} />}
        label="Humidity"
        value={humidity !== "--" ? `${humidity}%` : "--"}
      />

      <WeatherDetail
        icon={<Wind size={20} />}
        label="Wind"
        value={windLabel}
      />

      <WeatherDetail
        icon={<Eye size={20} />}
        label="Visibility"
        value={formatVisibility(visibility)}
      />

      <WeatherDetail
        icon={<Cloud size={20} />}
        label="Cloudiness"
        value={cloudiness !== "--" ? `${cloudiness}%` : "--"}
      />
    </div>
  );
}

function WeatherDetail({ icon, label, value }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl bg-slate-50 p-4">
      <div className="mb-4 flex items-center gap-2 text-sky-700">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </span>
      </div>

      <p className="text-lg font-bold tracking-wide text-slate-800">
        {value}
      </p>
    </div>
  );
}

export default WeatherDetails;