import { FETCH_USER } from "../actions/types";

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; //if the user logout then the payload will be empty string then return false to the reducers
    default:
      return state;
  }
}
