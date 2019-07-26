import {
  GET_ACCOUNT,
  ACCOUNT_ERROR,
  CLEAR_PROFILE,
  UPDATE_ACCOUNT
} from '../actions/types';

const initState = {
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
