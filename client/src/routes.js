import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./hoc/layout";
import "./App.css";
import Auth from "./hoc/auth";
import Home from "./components/home";
import LoginRegister from "./components/auth";
import Register from "./components/auth/register";
import Dashboard from "./components/user";
import EditAccount from "./components/user/edit_account";
import Chats from "./components/chats";
import Chat from "./components/chats/chat";
import AddChat from "./components/chats/addChat";
import Cart from "./components/cart";
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <h3>React Client Server App</h3>
//       </div>
//     );
//   }
// }
const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/chats" exact component={Auth(Chats, null)} />
        <Route
          path="/chats/search/:srchStr"
          exact
          component={Auth(Chat, null)}
        />
        <Route path="/chat/add" exact component={Auth(AddChat, null)} />

        <Route path="/chats/:id" exact component={Auth(Chat, null)} />
        {/* <Route path="/user/favorites" exact component={Auth(Favorites, true)} /> */}

        <Route path="/user/edit" exact component={Auth(EditAccount, true)} />
        <Route path="/user/dashboard" exact component={Auth(Dashboard, true)} />

        <Route path="/login" exact component={Auth(LoginRegister, false)} />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/" exact component={Auth(Home, null)} />
      </Switch>
    </Layout>
  );
};
export default Routes;
