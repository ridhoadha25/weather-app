import { useState } from "react";
import { Search } from "lucide-react";

import { useWeather } from "../context/WeatherContext";

function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const { searchByCity, loading } = useWeather();

  function handleSearch() {
    if (inputValue.trim()) {
      searchByCity(inputValue.trim());
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className="mx-auto mb-10 max-w-2xl">
      <div className="flex items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-sm shadow-slate-200/60 focus-within:border-sky-300 focus-within:ring-4 focus-within:ring-sky-100">
        <Search
          className="ml-3 shrink-0 text-slate-400"
          size={20}
        />

        <input
          id="city-search-input"
          type="text"
          aria-label="City name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a city name..."
          disabled={loading}
          className="w-full bg-transparent px-4 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:opacity-50"
        />

        <button
          id="city-search-btn"
          onClick={handleSearch}
          disabled={loading || !inputValue.trim()}
          className="shrink-0 rounded-xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
}

export default SearchBar;