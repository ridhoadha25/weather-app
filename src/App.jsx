import { Sunrise, Sunset } from "lucide-react";

import { WeatherProvider, useWeather } from "./context/WeatherContext";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import { formatTime } from "./utils/weatherUtils";

function AppContent() {
  const { weather, loading, error } = useWeather();

  const timezoneOffset = weather?.timezone ?? 0;
  const sunrise = weather?.sys?.sunrise;
  const sunset = weather?.sys?.sunset;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-5 sm:px-6 lg:px-8">
        <Navbar />

        <section className="mb-8 py-8 text-center sm:py-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-sky-700">
            Your daily weather
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            A clearer view of
            <span className="block text-sky-700">what's ahead.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
            Check current conditions and the forecast for any city around the world.
          </p>
        </section>

        <SearchBar />

        {loading && <Loading />}
        {!loading && error && <ErrorMessage message={error} />}

        {!loading && !error && (
          <div className="space-y-8">
            <WeatherCard />

            {weather && (
              <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <SunInfoCard
                  icon={Sunrise}
                  title="Sunrise"
                  value={formatTime(sunrise, timezoneOffset)}
                />
                <SunInfoCard
                  icon={Sunset}
                  title="Sunset"
                  value={formatTime(sunset, timezoneOffset)}
                />
              </section>
            )}

            <Forecast />
          </div>
        )}

        <footer className="mt-14 border-t border-slate-200 py-6 text-center text-xs text-slate-400">
          Weatherly <span className="px-1">·</span> By M.Ridho Adha
        </footer>
      </div>
    </main>
  );
}

function App() {
  return (
    <WeatherProvider>
      <AppContent />
    </WeatherProvider>
  );
}

function SunInfoCard({ icon: Icon, title, value }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
        <Icon size={21} />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </p>
        <p className="mt-1 text-xl font-bold tracking-tight text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}

export default App;
