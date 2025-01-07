import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/authSlice';
import signupReducer from '@/signupSlice';
import eventReducer from '@/eventSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    signup: signupReducer,
    events: eventReducer,
  },
});

export default store;