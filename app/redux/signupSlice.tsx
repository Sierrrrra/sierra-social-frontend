import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  signupData: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    // dateOfBirth: '',
    interests: [],
  },
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    updateSignupData: (state, action) => {
      state.signupData = {
        ...state.signupData,
        ...action.payload, // Merge new fields into the state
      };
    },
    updateInterests: (state, action) => {
      state.signupData.interests = action.payload; // Replace interests array
    },
    resetSignupData: (state) => {
      state.signupData = initialState.signupData; // Reset to initial state
    },
  },
});

export const { updateSignupData, updateInterests, resetSignupData } = signupSlice.actions;
export default signupSlice.reducer;
