import React, { Component } from "react";
import LayoutAdmin from "../../hoc/adminLayout";
import CartBlock from "../utils/cart_block";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  GetFavoriteItems,
  DeleteFromFavorites
} from "../../actions/user_actions";

class Cart extends Component {
  state = {
    loading: true,
    total: 0,
    showTotal: false,
    showSuccess: false,
    showError: false,
    errMsg: ""
  };
  componentDidMount() {
    let cartItems = [];
    let user = this.props.user;
    this.setState({ showSuccess: false });
    if (user.userData.favorites) {
      if (user.userData.favorites.length > 0) {
        user.userData.favorites.forEach(item => {
          cartItems.push(item.id);
        });
        this.props
          .dispatch(GetFavoriteItems(cartItems, user.userData.favorites))
          .then(() => {
            if (this.props.user.cartDetail.length > 0) {
              this.calculateTotal(this.props.user.cartDetail);
            }
          });
      }
    }
  }

  removeFromCart = id => {
    this.props.dispatch(DeleteFromFavorites(id));
  };

  render() {
    const cartProducts = this.props.products.cartDetail;
    const user = this.props.user.userData;
    return (
      <LayoutAdmin>
        <div className="user_nfo_panel">
          <h3>
            My Cart
            {/* <table>
              <tr>
                <th>Item</th>
                <th>qty</th>
              </tr>
              <tr>
                <td> {this.props.user.userData.cart[0].id}</td>
                <td> {this.props.user.userData.cart[0].qty}</td>
              </tr>
              <tr>
                <td> {this.props.user.userData.cart[1].id}</td>
                <td> {this.props.user.userData.cart[2].qty}</td>
              </tr>
            </table> */}
          </h3>
          <div className="container">
            <div>
              {/* <CartBlock cart={this.props.user.userData.cart} /> */}
              {this.state.total === 0 && !this.state.showSuccess ? (
                <div>No items in cart</div>
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

              {this.state.showSuccess ? (
                <div className="show_success">
                  THank you. Your order has been processed Successfully
                </div>
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
