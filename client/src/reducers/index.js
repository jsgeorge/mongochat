import { combineReducers } from "redux";
import user from "./user_reducer";
import chats from "./chat_reducer";
import categories from "./category_reducer";
const rootReducer = combineReducers({
  user,
  chats,
  categories
});
export default rootReducer;
