function ErrorMessage({ message = "City not found." }) {
  return (
    <div role="alert" className="mb-8 overflow-hidden rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center">
      <p className="text-lg font-semibold text-rose-800">
        {message}
      </p>

      <p className="mt-2 text-sm text-rose-700/80">
        Please check the city name and try again.
      </p>
    </div>
  );
}

export default ErrorMessage;