import React, { Component } from "react";
import { connect } from "react-redux";
import { getProductById } from "../../../../actions/product_actions";
import { withRouter } from "react-router-dom";
import LayoutAdmin from "../../../../Hoc/adminLayout";

import AdminProductImage from "./image";
import AdminProductDetail from "./detail";
import { AddToCart } from "../../../../actions/user_actions";

class AdminProduct extends Component {
  componentDidMount() {
    const userId = this.props.user.userData._id;
    const prodId = this.props.match.params.id;
    const ProductName = this.props.match.params.name;
    this.props.dispatch(getProductById(prodId, "single"));
  }
  addToCartHandler(id) {
    this.props.user.userData.isAuth
      ? this.props.dispatch(AddToCart(id)).then(response => {
          this.props.history.push("/shop/cart");
        })
      : this.props.history.push("/login");
  }
  render() {
    const detail = this.props.products.byId;
    return (
      <LayoutAdmin>
        <h3>View Product</h3>

        <div>
          {this.props.products.byId
            ? this.props.products.byId.map(product => (
                <div className="product_wrapper">
                  <div>
                    <AdminProductDetail
                      addToCart={id => this.addToCartHandler(id)}
                      product={product}
                    />
                  </div>

                  <div className="product_image_container">
                    <AdminProductImage product={product} />
                  </div>
                </div>
              ))
            : "Loading"}
        </div>
      </LayoutAdmin>
    );
  }
}
const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user
  };
};
export default connect(mapStateToProps)(withRouter(AdminProduct));
