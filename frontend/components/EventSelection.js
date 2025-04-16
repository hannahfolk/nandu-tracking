import { useQuery, useMutation } from "@apollo/client";

import { GET_ALL_EVENTS } from "../graphql/queries";
import { UPDATE_USER_EVENTS } from "../graphql/mutations";
import EventCard from "./EventCard";

export default function EventSelection() {
  const { loading, error, data } = useQuery(GET_ALL_EVENTS);
  const [updateEvents] = useMutation(UPDATE_USER_EVENTS);

  const handleEventToggle = async (eventId, isParticipating) => {
    try {
      await updateEvents({
        variables: { eventId, participate: !isParticipating },
        optimisticResponse: {
          __typename: "Mutation",
          updateUserEvents: {
            __typename: "User",
            id: "current-user", // This should be the actual user ID
            events: isParticipating
              ? data.user.events.filter((id) => id !== eventId)
              : [...data.user.events, eventId],
          },
        },
      });
    } catch (err) {
      console.error("Error updating events:", err);
    }
  };

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>Error loading events</div>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Select Your Events</h2>
      <div className="space-y-2">
        {data.events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            isSelected={data.user?.events?.includes(event.id)}
            onToggle={handleEventToggle}
          />
        ))}
      </div>
    </div>
  );
}
