function Loading() {
  return (
    <div className="flex min-h-[240px] items-center justify-center">
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-sky-100 border-t-sky-700" />

        <p className="mt-5 text-sm font-medium tracking-wide text-slate-600">
          Getting the latest weather...
        </p>
      </div>
    </div>
  );
}

export default Loading;