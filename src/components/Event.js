import { View, Text } from "react-native";
import EventList from "./EventList";
import events from "../utils/eventData";

export default Event = () => {
  return (
    <>
      {events.map((event) => (
        <EventList event={event} key={event.id} />
      ))}
    </>
  );
};
