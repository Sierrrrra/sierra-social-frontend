import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    signupSuccess: false,
    loginSuccess: false,
  },
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.signupSuccess = true;
      state.user = action.payload;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.loginSuccess = true;
      state.user = action.payload;
    },
    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.loginSuccess = false;
      state.signupSuccess = false;
    },
  },
});

export const {
  authStart,
  signupSuccess,
  loginSuccess,
  authFailure,
  logout,
} = authSlice.actions;

export const signupUser = (userData) => async (dispatch) => {
  console.log(userData.signupData)
  dispatch(authStart());
  try {
    const response = await axios.post('https://api.example.com/signup', userData);
    dispatch(signupSuccess(response.data));
  } catch (error) {
    dispatch(authFailure(error.message));
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  console.log(credentials)
  dispatch(authStart());
  try {
    const response = await axios.post('https://api.example.com/login', credentials);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(authFailure(error.message));
  }
};

export default authSlice.reducer;
