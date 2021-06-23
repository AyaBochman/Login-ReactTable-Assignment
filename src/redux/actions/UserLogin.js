import { USER_LOGIN } from "./index";

export const UserLogin = (data) => async (dispatch) => {
  await dispatch({
    type: USER_LOGIN,
    payload: data,
  });
};
