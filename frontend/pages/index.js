import { useQuery } from "@apollo/client";

import { GET_USER_EVENTS } from "../graphql/queries";
import EventSelection from "../components/EventSelection";
import AuthGuard from "../components/AuthGuard";

export default function Home() {
  const { data, loading, error } = useQuery(GET_USER_EVENTS);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 bg-gradient-to-br from-blue-50 to-indigo-50">
        <main className="max-w-4xl mx-auto py-8 px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.user ? `${data.user.username}'s Events` : "My Events"}
            </h1>
            <p className="mt-2 text-gray-600">Select the events you'll be participating in</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">Error loading events: {error.message}</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <EventSelection />
              </div>

              {data?.user?.events?.length > 0 && (
                <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">Your Selected Events</h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {data.user.events.map((event) => (
                      <div key={event.id} className="px-6 py-4 flex justify-between items-center">
                        <div>
                          <h3 className="text-md font-medium">{event.englishName}</h3>
                          <p className="text-sm text-gray-500">
                            {event.chineseName} ({event.code})
                          </p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Registered
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </AuthGuard>
  );
}
