import {
  GET_USER,
  ACCOUNT_ERROR,
  CLEAR_PROFILE,
  UPDATE_ACCOUNT,
  FETCH_ACCOUNTS,
  FETCH_ACCOUNT
} from '../actions/types';

const initState = {
  accounts: [],
  account: null,
  loading: true,
  loggedUser: null,
  error: {}
};

export default function(state = initState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER:
    case UPDATE_ACCOUNT:
      return {
        ...state,
        loggedUser: payload,
        loading: false
      };
    case FETCH_ACCOUNTS:
      return {
        ...state,
        accounts: payload,
        loading: false
      };
    case FETCH_ACCOUNT:
      return {
        ...state,
        account: payload,
        loading: false
      };
    case ACCOUNT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        account: null,
        loading: false
      };
    default:
      return state;
  }
}
