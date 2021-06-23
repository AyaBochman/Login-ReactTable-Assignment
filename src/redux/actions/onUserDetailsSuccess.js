/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import { ON_USER_DETAILS_SUCCESS } from "./index";

export const onUserDetailsSuccess = (data) => async (dispatch) => {
  await dispatch({
    type: ON_USER_DETAILS_SUCCESS,
    payload: data,
  });
};
