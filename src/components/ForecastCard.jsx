function ForecastCard({
  day,
  date,
  iconUrl,
  condition,
  tempMax,
  tempMin,
}) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-base font-bold tracking-wide text-slate-800">
            {day}
          </p>
          <p className="mt-0.5 text-xs text-slate-400">
            {date}
          </p>
        </div>

        {iconUrl ? (
          <img
            src={iconUrl}
            alt={condition}
            className="-mr-2 h-12 w-12 drop-shadow-sm"
          />
        ) : (
          <span className="text-3xl text-slate-300">☁</span>
        )}
      </div>

      <div className="mt-auto">
        <p className="mb-3 text-sm font-medium text-slate-500 line-clamp-1">
          {condition}
        </p>

        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-slate-800">
            {tempMax}
          </span>
          <span className="text-sm font-medium text-slate-400">
            {tempMin}
          </span>
        </div>
      </div>

    </div>
  );
}

export default ForecastCard;