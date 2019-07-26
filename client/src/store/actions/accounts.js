import axios from 'axios';
import { setAlert } from './alert';
import { GET_ACCOUNT, ACCOUNT_ERROR, UPDATE_ACCOUNT } from '../actions/types';

// Create or update account
export const createAccount = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify(formData);

    const res = await axios.post('/api/accounts', body, config);

    dispatch({
      type: GET_ACCOUNT,
      payload: res.data
    });
    dispatch(setAlert('Account added', 'success'));
    // history.push('/dashboard');
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

// Add Meta Content
export const addMeta = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify(formData);

    const res = await axios.put('/api/accounts/meta', body, config);

    dispatch({ type: UPDATE_ACCOUNT, payload: res.data });
    dispatch(setAlert('Meta content added!', 'success'));
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
