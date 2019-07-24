import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  AUTH_SUCCESS,
  AUTH_FAILURE
} from './types';
import { setAlert } from './alert';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

// Get authenticated user
export const setAuthUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = axios.get('/api/auth');
    dispatch({ type: AUTH_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_FAILURE });
  }
};

// Register User
export const registerUser = ({ name, email, password }) => async dispatch => {
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
  } catch (err) {
    console.log(err.response);
    const errors = err.response.data.errors; // coming from backend setup

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: REGISTER_FAILURE });
  }
};
