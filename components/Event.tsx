import { View, Text } from "react-native";
import EventList from "@/components/EventList";
import events from "@/utils/eventData";

export default function Event({ selectedCategory }) {
  // Filter events based on the selected category
  const filteredEvents =
    selectedCategory === "All Events"
      ? events
      : events.filter((event) =>
          event.category && event.category.includes(selectedCategory)
        );

  return (
    <>
      {filteredEvents.map((event) => (
        <EventList event={event} key={event.id} />
      ))}
    </>
  );
}
