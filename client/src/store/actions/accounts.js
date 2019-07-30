import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_USER,
  GET_ACCOUNTS,
  ACCOUNT_ERROR,
  FETCH_ACCOUNTS,
  FETCH_ACCOUNT
} from '../actions/types';

// Create or update account
export const createAccount = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify(formData);

    const res = await axios.post('/api/accounts', body, config);

    dispatch({
      type: GET_USER,
      payload: res.data
    });
    dispatch(setAlert('Account added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ACCOUNT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Fetch accounts based on input
export const fetchAccounts = term => async dispatch => {
  try {
    const res = await axios.get(`/api/accounts?query=${term}`);
    dispatch({ type: FETCH_ACCOUNTS, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: ACCOUNT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const fetchAccountDetails = accountId => async dispatch => {
  try {
    const res = await axios.get(`/api/accounts/${accountId}`);
    dispatch({ type: FETCH_ACCOUNT, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: ACCOUNT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
