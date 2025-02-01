import { View, Text } from "react-native";
import axios from "axios";

import EventList from "@/components/EventList";

const EVENTBRITE_PRIVATE_TOKEN = "CQYEEBJJYWBI7MZJ2AJA"; // Private token provided
const BASE_URL = "https://www.eventbriteapi.com/v3";

// Example usage: Search for events with multiple keywords in Madrid during February 2025
const keywords = [
  "tech",
  "bars",
  "food",
  "concerts",
  "fitness",
  "cooking",
  "dating",
  "networking",
];

export default function Event({ selectedCategory }) {
  // Filter events based on the selected category

  const searchEvents = async (
    keywords,
    location,
    startDate,
    endDate,
    page = 1
  ) => {
    try {
      // Convert keyword array into a comma-separated string for the query
      const query = keywords.join(",");

      const response = await axios.get(`${BASE_URL}/events/search/`, {
        headers: {
          Authorization: `Bearer ${EVENTBRITE_PRIVATE_TOKEN}`,
          Accept: "application/json",
        },
        params: {
          q: query, // Search multiple keywords separated by commas
          "location.address": location, // City or location (e.g., 'Madrid')
          "start_date.range_start": startDate, // Example: '2025-02-01T00:00:00Z'
          "start_date.range_end": endDate, // Example: '2025-02-28T23:59:59Z'
          sort_by: "date", // Options: best, date, distance
          page: page,
        },
      });

      console.log("Public Events:", response.data.events);
      return response.data.events;
    } catch (error) {
      console.error(
        "Error fetching events:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const events = searchEvents(
    keywords,
    "Madrid",
    "2025-02-01T00:00:00Z",
    "2025-02-28T23:59:59Z"
  );

  const filteredEvents =
    selectedCategory === "All Events"
      ? events
      : events.filter(
          (event) => event.category && event.category.includes(selectedCategory)
        );

  return (
    <>
      {filteredEvents.map((event) => (
        <EventList event={event} key={event.id} />
      ))}
    </>
  );
}
