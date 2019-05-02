import React, { Component } from "react";
import { connect } from "react-redux";
import MyButton from "../utils/button";
import { withRouter } from "react-router-dom";

class HomePage extends Component {
  componentDidMount() {
    //   if (this.state.user.userData) this.props.history.push("/chats");
  }
  render() {
    return (
      <div style={{ width: "100%" }}>
        <div className="home_wrapper">
          <span className="logo">MongoChat</span>
        </div>
        <div
          className="button_wrapper"
          style={{
            width: "100%",
            paddingTop: "10%",
            paddingBottom: "10%",
            background: "#fff"
          }}
        >
          <div
            className="buttons"
            style={{ width: "150px", margin: "0px auto" }}
          >
            <MyButton type="home" title="Login" linkTo="/login" />
            <MyButton type="home" title="Register" linkTo="/Register" />
          </div>{" "}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(withRouter(HomePage));
