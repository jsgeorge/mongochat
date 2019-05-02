import axios from "axios";
import {
  USER_LOGIN,
  USER_REGISTER,
  AUTH_USER,
  USER_EDIT,
  USER_LOGOUT,
  USER_ADD_TO_FAVORITES,
  USER_DELETE_FROM_FAVORITES,
  USER_GET_FAVORITE_ITEMS,
  USER_ADD_TO_FOLLOWING,
  USER_DELETE_FROM_FOLLOWING,
  USER_GET_FOLLOWING_USERS,
  GET_USERS,
  GET_USERS_BY_ID
} from "./types";

import { USER_SERVER } from "../components/utils/misc";
import { CHAT_SERVER } from "../components/utils/misc";

export function UserLogin(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then(response => response.data);
  return {
    type: USER_LOGIN,
    payload: request
  };
}
export function UserRegister(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then(response => response.data);
  return {
    type: USER_REGISTER,
    payload: request
  };
}
export function UserEdit(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/edit`, dataToSubmit)
    .then(response => response.data);
  return {
    type: USER_EDIT,
    payload: request
  };
}
export function AddToFavorites(id) {
  const request = axios
    .post(`${USER_SERVER}/addtoFavorites?id=${id}`)
    .then(response => response.data);
  return {
    type: USER_ADD_TO_FAVORITES,
    payload: request
  };
}
export function DeleteFromFavorites(id) {
  const request = axios
    .get(`${USER_SERVER}/deletefromFavorites?id=${id}`)
    .then(response => response.data);

  return {
    type: USER_DELETE_FROM_FAVORITES,
    payload: request
  };
}

export function AddToFollowing(id) {
  const request = axios
    .post(`${USER_SERVER}/addtoFollowing?id=${id}`)
    .then(response => response.data);
  return {
    type: USER_ADD_TO_FOLLOWING,
    payload: request
  };
}
export function DeleteFromFollowing(id) {
  const request = axios
    .get(`${USER_SERVER}/deletefromFollowing?id=${id}`)
    .then(response => response.data);

  return {
    type: USER_DELETE_FROM_FOLLOWING,
    payload: request
  };
}

export function GetFavorites(cartItems, userCart) {
  const request = axios
    .get(`${CHAT_SERVER}/articles_by_id?id=${cartItems}&type=array`)
    .then(response => {
      return response.data;
    });

  return {
    type: USER_GET_FAVORITE_ITEMS,
    payload: request
  };
}
export function GetFowllowingUsers(cartItems, userCart) {
  const request = axios.get(`${USER_SERVER}/following`).then(response => {
    return response.data;
  });

  return {
    type: USER_GET_FOLLOWING_USERS,
    payload: request
  };
}
export function UserLogout() {
  const request = axios
    .get(`${USER_SERVER}/logout`)
    .then(response => response.data);
  return {
    type: USER_LOGOUT,
    payload: request
  };
}
export function auth() {
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then(response => response.data);
  return {
    type: AUTH_USER,
    payload: request
  };
}
export function getUsers() {
  const request = axios
    .get(`${USER_SERVER}/list`)
    .then(response => response.data);
  return {
    type: GET_USERS,
    payload: request
  };
}

export function getUsersById(ids, type) {
  const request = axios
    .get(`${USER_SERVER}/by_id?type=${type}&id=${ids}`)
    .then(response => response.data);
  return {
    type: GET_USERS_BY_ID,
    payload: request
  };
}
