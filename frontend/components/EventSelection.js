import { useQuery, useMutation } from "@apollo/client";

import { ME } from "../graphql/authMutations";
import { GET_ALL_EVENTS } from "../graphql/queries";
import { UPDATE_USER_EVENTS } from "../graphql/mutations";
import EventCard from "./EventCard";

export default function EventSelection() {
  const { loading, error, data } = useQuery(GET_ALL_EVENTS);
  const { data: userData } = useQuery(ME);
  const [updateEvents] = useMutation(UPDATE_USER_EVENTS);

  const handleEventToggle = async (eventId) => {
    const usersEvents = userData?.me.events || [];
    const isEventAlreadyAdded = usersEvents.some((event) => event.id === eventId);
    const [currentEvent] = data.events.filter((event) => event.id === eventId);

    try {
      await updateEvents({
        variables: { eventId },
        optimisticResponse: {
          __typename: "Mutation",
          updateUserEvents: {
            __typename: "User",
            id: userData?.me.id,
            events: isEventAlreadyAdded
              ? usersEvents.filter((event) => event.id !== eventId)
              : [
                  ...usersEvents,
                  {
                    ...currentEvent,
                    createdAt: new Date().toISOString(),
                  },
                ],
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
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.events.map((event) => {
          return (
            <EventCard
              key={event.id}
              event={event}
              isSelected={userData.me?.events?.some((item) => item.id === event.id)}
              onToggle={handleEventToggle}
            />
          );
        })}
      </div>
    </div>
  );
}
