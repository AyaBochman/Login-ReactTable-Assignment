import { ON_USER_LOGIN_SUCCESS } from "../actions";

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
    default:
      return state;
  }
}
