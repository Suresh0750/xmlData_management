"use client"


export default function Error({
  error,
  reset,
}: {
    error: Error
  reset: () => void
}) {
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-2xl text-gray-600 mb-8">{error?.message ? error?.message : "Something went wrong"}</p>
        <p className="text-gray-500 mb-8">
          We apologize for the inconvenience. Our team has been notified and is working on the issue.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Try again
        </button>
      </div>
    </div>
  )
}

