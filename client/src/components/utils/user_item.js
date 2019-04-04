import React, { Component } from "react";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import { AddToFollowing } from "../../actions/user_actions";
import { DeleteFromFollowing } from "../../actions/user_actions";
import { connect } from "react-redux";

class UserItem extends Component {
  state = {
    open: false
  };
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };
  // renderFollowBtn = id => (
  //   id
  // );

  render() {
    const props = this.props;
    return (
      <div>
        <ListItemText>
          {props.username ? (
            props.username
          ) : (
            <span>
              {props.name} {props.lastname}
            </span>
          )}
        </ListItemText>

        {props.email != this.props.user.userData.email ? (
          <ListItemSecondaryAction>
            <div className="button_wrapp">
              {this.state.open ? (
                <button
                  className="unfollow_btn"
                  onClick={() => {
                    this.handleClick();

                    this.props.dispatch(DeleteFromFollowing(props._id));

                    console.log("unfollow user");
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className="follow_btn"
                  onClick={() => {
                    this.handleClick();
                    console.log("follow user");
                    this.props.dispatch(AddToFollowing(props.id));
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </ListItemSecondaryAction>
        ) : (
          <ListItemSecondaryAction>Me</ListItemSecondaryAction>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(UserItem);
