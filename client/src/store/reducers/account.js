import {
  GET_ACCOUNT,
  ACCOUNT_ERROR,
  CLEAR_PROFILE,
  UPDATE_ACCOUNT,
  GET_ACCOUNTS
} from '../actions/types';

const initState = {
  accounts: [],
  account: null,
  loading: true,
  error: {}
};

export default function(state = initState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ACCOUNT:
    case UPDATE_ACCOUNT:
      return {
        ...state,
        account: payload,
        loading: false
      };
    case GET_ACCOUNTS:
      return {
        ...state,
        accounts: payload,
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
