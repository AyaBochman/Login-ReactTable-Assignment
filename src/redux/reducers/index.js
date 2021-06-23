import { ON_USER_LOGIN_SUCCESS, ON_USER_DETAILS_SUCCESS } from "../actions";

export default function reducers(state, action) {
  const { type, payload } = action;
  switch (type) {
    case ON_USER_LOGIN_SUCCESS: {
      return {
        ...state,
        userToken: payload,
        isLoggedIn: true,
      };
    }
    case ON_USER_DETAILS_SUCCESS: {
      return {
        ...state,
        userDetails: payload,
      };
    }
    default:
      return state;
  }
}
