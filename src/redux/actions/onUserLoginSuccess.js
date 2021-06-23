/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import { ON_USER_LOGIN_SUCCESS } from "./index";

export const onUserLoginSuccess = (data) => async (dispatch) => {
  await dispatch({
    type: ON_USER_LOGIN_SUCCESS,
    payload: data,
  });
};
