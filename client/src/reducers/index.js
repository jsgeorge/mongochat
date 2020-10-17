import { combineReducers } from "redux";
import user from "./user_reducer";
import users from "./user_reducer";
import chats from "./chat_reducer";
import categories from "./category_reducer";
const rootReducer = combineReducers({
  user,
  chats,
  categories,
  users,
});
export default rootReducer;
