// =============================================
// FORMAT SUHU
// =============================================

/**
 * Format suhu bulat dengan simbol derajat
 * @param {number} temp - Suhu dalam Celsius
 */
export function formatTemperature(temp) {
  if (temp === undefined || temp === null) {
    return "--";
  }

  return `${Math.round(temp)}°`;
}

// =============================================
// FORMAT ANGIN
// =============================================

/**
 * Format kecepatan angin dari m/s ke km/h
 * @param {number} speed - Kecepatan dalam m/s (dari OpenWeather)
 */
export function formatWindSpeed(speed) {
  if (speed === undefined || speed === null) {
    return "--";
  }

  // OpenWeather menggunakan m/s, konversi ke km/h
  const kmh = speed * 3.6;

  return `${Math.round(kmh)} km/h`;
}

/**
 * Konversi derajat angin menjadi arah mata angin
 * @param {number} degrees - Arah angin dalam derajat (0–360)
 * @returns {string} Contoh: "N", "NE", "SW"
 */
export function getWindDirection(degrees) {
  if (degrees === undefined || degrees === null) {
    return "--";
  }

  const directions = [
    "N", "NNE", "NE", "ENE",
    "E", "ESE", "SE", "SSE",
    "S", "SSW", "SW", "WSW",
    "W", "WNW", "NW", "NNW",
  ];

  const index = Math.round(degrees / 22.5) % 16;

  return directions[index];
}

// =============================================
// FORMAT WAKTU & TANGGAL
// =============================================

/**
 * Format Unix timestamp menjadi waktu lokal kota tujuan
 * @param {number} timestamp - Unix timestamp (detik)
 * @param {number} timezoneOffset - Offset zona waktu dalam detik (dari API OpenWeather)
 */
export function formatTime(timestamp, timezoneOffset = 0) {
  if (!timestamp) {
    return "--";
  }

  // UTC ms + offset kota → waktu lokal kota
  const localMs = (timestamp + timezoneOffset) * 1000;
  const date = new Date(localMs);

  // Gunakan UTC karena offset sudah ditambahkan manual
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const suffix = date.getUTCHours() >= 12 ? "PM" : "AM";
  const h12 = date.getUTCHours() % 12 || 12;

  return `${String(h12).padStart(2, "0")}:${minutes} ${suffix}`;
}

/**
 * Format Unix timestamp menjadi tanggal lengkap kota tujuan
 * @param {number} timestamp - Unix timestamp (detik)
 * @param {number} timezoneOffset - Offset zona waktu dalam detik
 */
export function formatDate(timestamp, timezoneOffset = 0) {
  if (!timestamp) {
    return "--";
  }

  const localMs = (timestamp + timezoneOffset) * 1000;
  const date = new Date(localMs);

  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const weekday = weekdays[date.getUTCDay()];
  const month = months[date.getUTCMonth()];
  const day = date.getUTCDate();

  return `${weekday}, ${month} ${day}`;
}

/**
 * Format Unix timestamp menjadi nama hari singkat (untuk Forecast)
 * @param {number} timestamp - Unix timestamp (detik)
 * @param {number} timezoneOffset - Offset zona waktu dalam detik
 * @returns {string} Contoh: "Mon", "Tue"
 */
export function formatDayShort(timestamp, timezoneOffset = 0) {
  if (!timestamp) {
    return "--";
  }

  const localMs = (timestamp + timezoneOffset) * 1000;
  const date = new Date(localMs);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getUTCDay()];
}

/**
 * Format Unix timestamp menjadi tanggal singkat (untuk Forecast)
 * @param {number} timestamp - Unix timestamp (detik)
 * @param {number} timezoneOffset - Offset zona waktu dalam detik
 * @returns {string} Contoh: "Aug 17"
 */
export function formatDateShort(timestamp, timezoneOffset = 0) {
  if (!timestamp) {
    return "--";
  }

  const localMs = (timestamp + timezoneOffset) * 1000;
  const date = new Date(localMs);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  return `${months[date.getUTCMonth()]} ${date.getUTCDate()}`;
}

// =============================================
// FORMAT LAINNYA
// =============================================

/**
 * Format jarak pandang dari meter ke km
 * @param {number} meters - Visibilitas dalam meter (dari OpenWeather)
 */
export function formatVisibility(meters) {
  if (meters === undefined || meters === null) {
    return "--";
  }

  const km = meters / 1000;

  if (km >= 10) {
    return "10+ km";
  }

  return `${km.toFixed(1)} km`;
}

/**
 * Mendapatkan URL icon cuaca dari OpenWeather
 * @param {string} iconCode - Kode icon (contoh: "01d", "09n")
 */
export function getWeatherIcon(iconCode) {
  if (!iconCode) {
    return null;
  }

  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

/**
 * Mengubah kode negara menjadi nama negara lengkap
 * @param {string} countryCode - Kode negara ISO (contoh: "ID", "US")
 */
export function getCountryName(countryCode) {
  if (!countryCode) {
    return "--";
  }

  try {
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

    return regionNames.of(countryCode);
  } catch {
    return countryCode;
  }
}

/**
 * Mendapatkan kelas CSS gradient background berdasarkan weather condition ID
 * @param {number} weatherId - Condition ID dari OpenWeather
 * @param {string} icon - Icon code untuk deteksi siang/malam (berakhiran "d"/"n")
 * @returns {{ bg: string, blob1: string, blob2: string, blob3: string }} Gradient & blob colors
 */
export function getWeatherBackground(weatherId, icon = "01d") {
  const isNight = icon?.endsWith("n");

  // Default / no data
  if (!weatherId) {
    return isNight
      ? { bg: "from-slate-900 via-indigo-950 to-slate-900", blob1: "bg-indigo-600/30", blob2: "bg-blue-800/20", blob3: "bg-slate-700/30" }
      : { bg: "from-sky-500 via-blue-600 to-indigo-700",   blob1: "bg-sky-300/30",    blob2: "bg-white/15",   blob3: "bg-indigo-400/20" };
  }

  // Thunderstorm (200–299)
  if (weatherId >= 200 && weatherId < 300) {
    return { bg: "from-slate-950 via-purple-900 to-slate-900", blob1: "bg-purple-500/30", blob2: "bg-violet-700/25", blob3: "bg-slate-600/30" };
  }

  // Drizzle (300–399)
  if (weatherId >= 300 && weatherId < 400) {
    return isNight
      ? { bg: "from-slate-900 via-blue-950 to-slate-950",   blob1: "bg-blue-700/30",   blob2: "bg-slate-600/25",  blob3: "bg-blue-900/20" }
      : { bg: "from-slate-600 via-blue-700 to-slate-800",   blob1: "bg-blue-400/30",   blob2: "bg-white/15",      blob3: "bg-slate-400/20" };
  }

  // Rain (500–599)
  if (weatherId >= 500 && weatherId < 600) {
    return isNight
      ? { bg: "from-slate-950 via-slate-800 to-blue-950",   blob1: "bg-blue-800/35",   blob2: "bg-slate-600/25",  blob3: "bg-blue-950/40" }
      : { bg: "from-slate-700 via-blue-800 to-slate-900",   blob1: "bg-blue-500/30",   blob2: "bg-slate-500/20",  blob3: "bg-blue-700/25" };
  }

  // Snow (600–699)
  if (weatherId >= 600 && weatherId < 700) {
    return isNight
      ? { bg: "from-slate-900 via-blue-900 to-indigo-950",  blob1: "bg-blue-400/20",   blob2: "bg-white/10",      blob3: "bg-indigo-600/20" }
      : { bg: "from-blue-300 via-indigo-400 to-blue-500",   blob1: "bg-white/40",      blob2: "bg-blue-200/30",   blob3: "bg-indigo-300/25" };
  }

  // Atmosphere — fog, mist, haze (700–799)
  if (weatherId >= 700 && weatherId < 800) {
    return isNight
      ? { bg: "from-slate-900 via-slate-700 to-slate-900",  blob1: "bg-slate-500/30",  blob2: "bg-slate-600/20",  blob3: "bg-slate-700/30" }
      : { bg: "from-slate-500 via-slate-400 to-slate-600",  blob1: "bg-white/25",      blob2: "bg-slate-300/30",  blob3: "bg-slate-500/20" };
  }

  // Clear sky (800)
  if (weatherId === 800) {
    return isNight
      ? { bg: "from-slate-950 via-indigo-900 to-slate-900", blob1: "bg-indigo-500/30", blob2: "bg-blue-800/20",   blob3: "bg-violet-700/20" }
      : { bg: "from-sky-400 via-blue-500 to-indigo-600",    blob1: "bg-sky-200/40",    blob2: "bg-white/20",      blob3: "bg-cyan-300/25" };
  }

  // Cloudy (801–899)
  return isNight
    ? { bg: "from-slate-900 via-slate-800 to-slate-950",    blob1: "bg-slate-600/30",  blob2: "bg-blue-900/20",   blob3: "bg-slate-700/25" }
    : { bg: "from-slate-500 via-blue-600 to-slate-700",     blob1: "bg-blue-400/30",   blob2: "bg-white/15",      blob3: "bg-slate-400/20" };
}