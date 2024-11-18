import axios from 'axios';
import { API_URL } from '../utils/enpoints';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
} from '../store/actions/authActions';


export const login = async (email, password) => {

  return async dispatch => {
    dispatch(loginRequest());
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });

      const user = response.data;
      dispatch(loginSuccess(user));
      return user;
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message || error.message));
      throw error;
    }
  }
}

export const register = async (userData) => {
  return async dispatch => {
    dispatch(registerRequest());

    try {
      const response = await axios.post(`${API_URL}/register`, userData);

      const user = response.data;
      dispatch(registerSuccess(user));
      return user;
    } catch (error) {
      dispatch(registerFailure(error.response?.data?.message || error.message));
      throw error;
    }
  }
};

export const logoutUser = () => {
  return async dispatch => {
    dispatch(logout());
  }
}; 
