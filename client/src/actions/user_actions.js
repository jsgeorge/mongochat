import axios from "axios";
import {
  USER_LOGIN,
  USER_REGISTER,
  AUTH_USER,
  USER_EDIT,
  USER_LOGOUT,
  USER_ADD_TO_FAVORITES,
  USER_DELETE_FROM_FAVORITES,
  USER_GET_FAVORITE_ITEMS
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
export function AddToFavorites(_id) {
  const request = axios
    .post(`${USER_SERVER}/addtoFavorites?prodId=${_id}`)
    .then(response => response.data);
  return {
    type: USER_ADD_TO_FAVORITES,
    payload: request
  };
}
export function DeleteFromFavorites(id) {
  const request = axios
    .get(`${USER_SERVER}/deletefromFavorites?_id=${id}`)
    .then(response => {
      response.data.cart.forEach(item => {
        response.data.cartDetail.forEach((k, i) => {
          if (item.id === k._id) {
            response.data.cartDetail[i].quantity = item.quantity;
          }
        });
      });
      return response.data;
    });
  return {
    type: USER_DELETE_FROM_FAVORITES,
    payload: request
  };
}
export function GetFavoriteItems(favoriteItems, userFavorites) {
  const request = axios
    .get(`${CHAT_SERVER}/articles_by_id?id=${favoriteItems}&type=array`)
    .then(response => {
      userFavorites.forEach(item => {
        response.data.forEach((k, i) => {
          if (item.id === k._id) {
            response.data[i].quantity = item.quantity;
          }
        });
      });
      return response.data;
    });

  return {
    type: USER_GET_FAVORITE_ITEMS,
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
