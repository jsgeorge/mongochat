import {
  GET_CHATS,
  GET_CHATS_BY_ID,
  GET_CHATS_BY_SELL,
  GET_CHATS_BY_ARRIVAL,
  CHAT_ADD,
  CHAT_LIKE
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_CHATS:
      return {
        ...state,
        view: action.payload.articles,
        viewSize: action.payload.size
      };
    case GET_CHATS_BY_ID:
      return {
        ...state,
        byId: action.payload
      };
    case GET_CHATS_BY_SELL:
      return { ...state, bySell: action.payload };
    case GET_CHATS_BY_ARRIVAL:
      return { ...state, byArrival: action.payload };
    case CHAT_ADD:
      return { ...state, addSuccess: action.payload };
    case CHAT_LIKE:
      return { ...state, editSuccess: action.payload };

    default:
      return state;
  }
}
