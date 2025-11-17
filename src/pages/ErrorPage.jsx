export default function ErrorPage({ error }) {
  console.error(error);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-700 text-center px-6">
      <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
      <p className="text-lg mb-6">
        We’re sorry — an unexpected error occurred. Please try again later.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Reload Page
      </button>
    </div>
  );
}
