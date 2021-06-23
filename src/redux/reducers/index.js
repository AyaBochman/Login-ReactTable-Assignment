import { ON_USER_LOGIN } from "../actions";

export default function reducers(state, action) {
  const { type, payload } = action;
  switch (type) {
    case ON_USER_LOGIN: {
      // eslint-disable-next-line no-console
      console.log("inside reducer", payload);
      return {
        ...state,
        userToken: payload,
      };
    }
    default:
      return state;
  }
}
