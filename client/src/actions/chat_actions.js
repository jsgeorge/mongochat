import axios from "axios";
import {
  GET_CHATS,
  GET_CHATS_BY_ID,
  GET_CHATS_BY_SELL,
  GET_CHATS_BY_ARRIVAL,
  CHAT_ADD,
  CHAT_LIKE
} from "./types";

import { CHAT_SERVER } from "../components/utils/misc";

export function getChats(skip, limit, filters = [], previousState = []) {
  const data = {
    limit,
    skip,
    filters
  };
  const request = axios.post(`${CHAT_SERVER}/view`, data).then(response => {
    let newState = [...previousState, ...response.data.articles];

    return {
      size: response.data.size,
      articles: newState
    };
  });
  return {
    type: GET_CHATS,
    payload: request
  };
}
export function getChatsById(id, type) {
  const request = axios
    .get(`${CHAT_SERVER}/articles_by_id?type=${type}&id=${id}`)
    .then(response => response.data);
  return {
    type: GET_CHATS_BY_ID,
    payload: request
  };
}
export function chatLike(id) {
  const request = axios
    .post(`${CHAT_SERVER}/like?id=${id}`)
    .then(response => response.data);
  return {
    type: CHAT_LIKE,
    payload: request
  };
}
export function getChatsBySell() {
  const request = axios
    .get(`${CHAT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
    .then(response => response.data);
  return {
    type: GET_CHATS_BY_SELL,
    payload: request
  };
}
export function getCHATSByArrival() {
  const request = axios
    .get(`${CHAT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then(response => response.data);
  return {
    type: GET_CHATS_BY_ARRIVAL,
    payload: request
  };
}
export function ChatAdd(dataToSubmit) {
  const request = axios
    .post(`${CHAT_SERVER}/article`, dataToSubmit)
    .then(response => response.data);
  return {
    type: CHAT_ADD,
    payload: request
  };
}
