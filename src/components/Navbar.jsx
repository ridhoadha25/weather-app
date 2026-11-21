import { useState } from "react";
import { Cloud, MapPin, Loader2 } from "lucide-react";

import { useWeather } from "../context/WeatherContext";

function Navbar() {
  const { searchByCoords, loading } = useWeather();
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState(null);

  function handleMyLocation() {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }

    setGeoLoading(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        await searchByCoords(coords.latitude, coords.longitude);
        setGeoLoading(false);
      },
      (err) => {
        setGeoLoading(false);

        if (err.code === err.PERMISSION_DENIED) {
          setGeoError("Location access denied.");
        } else {
          setGeoError("Unable to retrieve your location.");
        }
      },
      { timeout: 10_000 }
    );
  }

  const isBusy = geoLoading || loading;

  return (
    <nav className="mb-8 flex flex-col gap-2 border-b border-slate-200 pb-5">
      <div className="flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-700 text-white shadow-sm shadow-sky-900/15">
            <Cloud size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">
              Weatherly
            </h1>
            <p className="text-xs text-slate-500">Weather around the world</p>
          </div>
        </div>

        {/* My Location button */}
        <button
          id="my-location-btn"
          onClick={handleMyLocation}
          disabled={isBusy}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {geoLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <MapPin size={16} />
          )}

          <span className="hidden sm:inline">
            {geoLoading ? "Locating..." : "My Location"}
          </span>
        </button>
      </div>

      {/* Geo error */}
      {geoError && (
        <p role="alert" className="text-right text-xs text-rose-600">
          {geoError}
        </p>
      )}
    </nav>
  );
}

export default Navbar;