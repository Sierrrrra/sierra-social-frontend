import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    loading: false,
    error: null,
  },
  reducers: {
    eventStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchEventsSuccess: (state, action) => {
      state.loading = false;
      state.events = action.payload;
    },
    createEventSuccess: (state, action) => {
      state.loading = false;
      state.events.push(action.payload);
    },
    eventFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  eventStart,
  fetchEventsSuccess,
  createEventSuccess,
  eventFailure,
} = eventSlice.actions;

export const fetchEvents = () => async (dispatch) => {
  dispatch(eventStart());
  try {
    const response = await axios.get('https://api.example.com/events');
    dispatch(fetchEventsSuccess(response.data));
  } catch (error) {
    dispatch(eventFailure(error.message));
  }
};

export const createEvent = (eventData) => async (dispatch) => {
  dispatch(eventStart());
  try {
    const response = await axios.post('https://api.example.com/events', eventData);
    dispatch(createEventSuccess(response.data));
  } catch (error) {
    dispatch(eventFailure(error.message));
  }
};

export default eventSlice.reducer;
