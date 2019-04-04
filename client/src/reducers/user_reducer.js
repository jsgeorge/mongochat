import {
  USER_LOGIN,
  USER_REGISTER,
  USER_EDIT,
  AUTH_USER,
  USER_LOGOUT,
  USER_ADD_TO_FAVORITES,
  USER_DELETE_FROM_FAVORITES,
  USER_GET_FAVORITE_ITEMS,
  USER_ADD_TO_FOLLOWING,
  USER_DELETE_FROM_FOLLOWING,
  USER_GET_FOLLOWING_USERS,
  GET_USERS,
  GET_USERS_BY_ID
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
          favorites: action.payload
        }
      };
    case USER_DELETE_FROM_FAVORITES:
      return {
        ...state,
        userData: {
          ...state.userData,
          favorites: action.payload
        }
      };
    case USER_GET_FAVORITE_ITEMS:
      return {
        ...state,
        chatDetail: action.payload
      };
    case USER_ADD_TO_FOLLOWING:
      return {
        ...state,
        userData: {
          ...state.userData,
          following: action.payload
        }
      };
    case USER_DELETE_FROM_FOLLOWING:
      return {
        ...state,
        userData: {
          ...state.userData,
          following: action.payload
        }
      };
    case USER_GET_FOLLOWING_USERS:
      return {
        ...state,
        userDetail: action.payload
      };
    case USER_LOGOUT:
      return { ...state };

    case GET_USERS:
      return {
        ...state,
        list: action.payload
      };
    case GET_USERS_BY_ID:
      return {
        ...state,
        list: action.payload
      };
    default:
      return state;
  }
}
