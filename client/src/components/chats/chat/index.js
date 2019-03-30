import React, { Component } from "react";
import { connect } from "react-redux";
import { getChatsById } from "../../../actions/chat_actions";
import { Link, withRouter } from "react-router-dom";
import ProductImage from "./image";
import ProductDetail from "./detail";
import { AddToFavorites } from "../../../actions/user_actions";

class Product extends Component {
  componentDidMount() {
    const userId = this.props.user.userData._id;
    const prodId = this.props.match.params.id;
    this.props.dispatch(getChatsById(prodId, "single"));
  }
  addToCartHandler(id) {
    this.props.user.userData.isAuth
      ? this.props.dispatch(AddToFavorites(id)).then(response => {
          this.props.history.push("/shop/cart");
        })
      : this.props.history.push("/login");
  }
  render() {
    const detail = this.props.chats.byId;
    return (
      <div className="page_wrapper">
        <div className="page_top">
          <div className="container">
            <Link to={"/chats/cahat"}>Shop</Link> / View
          </div>{" "}
        </div>
        <div className="container">
          {this.props.chats.byId
            ? this.props.chats.byId.map(chat => (
                <div className="product_detail_wrapper">
                  <div className="product_image_container">
                    <ProductImage chat={chat} />
                  </div>
                  <div className="right">
                    <ProductDetail
                      AddToFavorites={id => this.addToCartHandler(id)}
                      chat={chat}
                    />
                  </div>
                </div>
              ))
            : "Loading"}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    chats: state.chats,
    user: state.user
  };
};
export default connect(mapStateToProps)(withRouter(Product));
