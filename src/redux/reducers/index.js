import {USER_LOGIN} from '../actions';

export default function reducers(state, action) {
    const {type, payload} = action;
    switch (type) {
      case USER_LOGIN: {
        return {
          ...state,
          user: []
        };
      }
      default:
        return state;
    }
  }
  