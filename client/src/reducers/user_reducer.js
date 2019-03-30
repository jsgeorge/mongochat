import {
  USER_LOGIN,
  USER_REGISTER,
  USER_EDIT,
  AUTH_USER,
  USER_LOGOUT,
  USER_ADD_TO_FAVORITES,
  USER_DELETE_FROM_FAVORITES,
  USER_GET_FAVORITE_ITEMS
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        loginSuccess: action.payload
      };
    case USER_REGISTER:
      return {
        ...state,
        regSuccess: action.payload
      };
    case USER_EDIT:
      return {
        ...state,
        editSuccess: action.payload
      };
    case AUTH_USER:
      return {
        ...state,
        userData: action.payload
      };
    case USER_ADD_TO_FAVORITES:
      return {
        ...state,
        userData: {
          ...state.userData,
          chat: action.payload
        }
      };
    case USER_DELETE_FROM_FAVORITES:
      return {
        ...state,
        chatDetail: action.payload.chatDetail,
        userData: {
          ...state.userData,
          chat: action.payload.cart
        }
      };
    case USER_GET_FAVORITE_ITEMS:
      return {
        ...state,
        chatDetail: action.payload
      };

    case USER_LOGOUT:
      return { ...state };
    default:
      return state;
  }
}
