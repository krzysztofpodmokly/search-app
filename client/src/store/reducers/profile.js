import { GET_PROFILE, PROFILE_ERROR } from '../actions/types';

const initState = {
  profile: null,
  loading: true,
  error: {}
};

export default function(state = initState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      console.log('REDUCER', payload);
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
