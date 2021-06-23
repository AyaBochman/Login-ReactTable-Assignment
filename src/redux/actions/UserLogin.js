/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import { USER_LOGIN } from "./index";

export const UserLogin = (data) => async (dispatch) => {
  await dispatch({
    type: USER_LOGIN,
    payload: data,
  });
};
