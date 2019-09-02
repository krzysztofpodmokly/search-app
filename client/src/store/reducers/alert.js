import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
const initState = {
  allAlerts: [],
  addClass: null,
  removeClass: null
};

export default function(state = initState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return {
        allAlerts: [...state.allAlerts, payload]
      };
    case REMOVE_ALERT:
      return {
        allAlerts: state.allAlerts.filter(alert => alert.id !== payload)
      };
    default:
      return state;
  }
}
