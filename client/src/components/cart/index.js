import React, { Component } from "react";
import LayoutAdmin from "../../hoc/adminLayout";
import CartBlock from "../utils/cart_block";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { GetFavorites, DeleteFromFavorites } from "../../actions/user_actions";

class Cart extends Component {
  state = {
    loading: true,
    showSuccess: false,
    showError: false,
    errMsg: ""
  };
  componentDidMount() {
    let cartItems = [];
    let user = this.props.user;
    if (user.userData.favorites) {
      if (user.userData.favorites.length > 0) {
        user.userData.favorites.forEach(item => {
          cartItems.push(item.id);
        });
        this.props.dispatch(GetFavorites(cartItems, user.userData.favorites));
      }
    }
  }

  removeFromCart = id => {
    this.props.dispatch(DeleteFromFavorites(id));
  };

  render() {
    //const favorites = this.props.favorites.chatDetail;
    // const user = this.props.user.userData;
    return (
      <LayoutAdmin>
        <div className="user_nfo_panel">
          <h3>My Favorites</h3>
          <div className="container">
            <div>
              {/* <CartBlock cart={this.props.user.userData.cart} /> */}
              {this.props.user.userData.favorites === 0 &&
              !this.state.showSuccess ? (
                <div>No favorites yet</div>
              ) : (
                <div>
                  <CartBlock
                    chats={this.props.user}
                    type="cart"
                    removeItem={id => this.removeFromFavorites(id)}
                  />
                </div>
              )}

              {this.state.showError ? (
                <div className="error_label"> {this.state.errMsg}</div>
              ) : null}
            </div>
          </div>
        </div>
      </LayoutAdmin>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    chats: state.chats
  };
};

export default connect(mapStateToProps)(withRouter(Cart));
