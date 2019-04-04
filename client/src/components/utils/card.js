import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { AddToFavorites } from "../../actions/user_actions";
//import { DeleteFromFavorites } from "../../actions/user_actions";

import { chatLike } from "../../actions/chat_actions";
//import myButton from "../utils/button";
import { withRouter } from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faStar from "@fortawesome/fontawesome-free-solid/faStar";

class Card extends Component {
  state = {
    open: false
  };
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };
  handleStar = () =>
    this.state.open ? (
      <FontAwesomeIcon
        icon={faStar}
        style={{ color: "rgb(25, 123, 189)", marginLeft: "4px" }}
      />
    ) : (
      <FontAwesomeIcon icon={faStar} style={{ marginLeft: "4px" }} />
    );
  renderCardImage(images) {
    if (images.length > 0) {
      return images[0].url;
    }
  }
  render() {
    const props = this.props;
    return (
      <div>
        <div className="action_container">
          <div className="tags">
            <div className="prod_info">
              <strong>
                {props.author.username ? (
                  <span>{props.author.username}</span>
                ) : (
                  <span>
                    {props.author.name} {props.author.lastname}
                  </span>
                )}
              </strong>{" "}
              <span className="item-text">{props.text}</span>
            </div>
            {props.images && props.images.length > 0 ? (
              <Link to={`/chats/${props._id}`}>
                <div
                  className="image"
                  style={{
                    background: `url(${this.renderCardImage(
                      props.images
                    )}) no-repeat`
                  }}
                />
              </Link>
            ) : null}
            <div className="actions">
              comments {props.comments.length} likes: {props.likes}
              <div className="button_wrapp">
                <Link className="card_link" to={`/chat/${props._id}`}>
                  More
                </Link>
              </div>
              <div className="button_wrapp">
                <button
                  className="like_link"
                  onClick={() => {
                    props.user.userData.isAuth
                      ? this.props.dispatch(chatLike(props._id))
                      : this.props.history.push("/login");
                  }}
                >
                  Like
                </button>
              </div>
              <div className="button_wrapp">
                {this.state.closed ? (
                  <button
                    className="add_favorites"
                    onClick={() => {
                      this.handleClick();
                      //props.user.userData.isAuth
                      // ? this.props.dispatch(DeleteFromFavorites(props._id))
                      // : this.props.history.push("/login");
                      console.log("Favorite Deleted");
                    }}
                  >
                    {this.handleStar()}
                  </button>
                ) : (
                  <button
                    className="add_favorites"
                    onClick={() => {
                      this.handleClick();
                      console.log("Favorite Added");
                      props.user.userData.isAuth
                        ? this.props.dispatch(AddToFavorites(props._id))
                        : this.props.history.push("/login");
                    }}
                  >
                    {this.handleStar()}
                  </button>
                )}
              </div>
            </div>
          </div>
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
export default connect(mapStateToProps)(withRouter(Card));
