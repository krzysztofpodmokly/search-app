import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  GET_ACCOUNT,
  ACCOUNT_ERROR,
  CLEAR_PROFILE
} from './types';
import { setAlert } from './alert';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

// Get authenticated user - load user
export const setAuthUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');
    dispatch({ type: AUTH_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_FAILURE });
  }
};

// Register User
export const registerUser = (name, email, password) => async dispatch => {
  // { name, email, password } => destructured formData from Register component
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data }); // res.data = token
    dispatch(setAuthUser());
  } catch (err) {
    console.log(err.response);
    const errors = err.response.data.errors; // coming from backend setup

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: REGISTER_FAILURE });
  }
};

// Login User
export const loginUser = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);
    console.log('LOGIN => ', res.data);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(setAuthUser());
  } catch (err) {
    console.log(err.response);
    const errors = err.response.data.errors; // coming from backend setup

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: LOGIN_FAILURE });
  }
};

// Logout User
export const logoutUser = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};

// Get Current User Data
export const getCurrentUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/users/me');
    dispatch({ type: GET_ACCOUNT, payload: res.data });
  } catch (err) {
    dispatch({
      type: ACCOUNT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
