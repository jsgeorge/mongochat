import React, { Component } from "react";
import { connect } from "react-redux";
import MyButton from "../utils/button";

class HomePage extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className="home_wrapper">
        <h2 className="logo">MongoChat</h2>
        <div className="buttons">
          <MyButton type="home" title="Login" linkTo="/login" />
          <MyButton type="home" title="Register" linkTo="/Register" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    chats: state.chats
  };
};
export default connect(mapStateToProps)(HomePage);
