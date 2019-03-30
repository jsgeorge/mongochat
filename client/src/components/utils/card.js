import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { AddToFavorites } from "../../actions/user_actions";
import { withRouter } from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faShoppingBag from "@fortawesome/fontawesome-free-solid/faShoppingBag";

class Card extends Component {
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
              <div className="name">
                <strong>{props.user.name} </strong> {props.text}
              </div>
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
              <div className="button_wrapp">
                <Link className="card_link" to={`/chat/${props._id}`}>
                  More
                </Link>
              </div>
              <div className="button_wrapp">
                <button
                  className="bag_link"
                  onClick={() => {
                    props.user.userData.isAuth
                      ? this.props.dispatch(AddToFavorites(props._id))
                      : this.props.history.push("/login");
                  }}
                >
                  Add
                </button>
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
