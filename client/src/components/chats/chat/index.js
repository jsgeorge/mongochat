import React, { Component } from "react";
import { connect } from "react-redux";
import { getChatsById } from "../../../actions/chat_actions";
import { Link, withRouter } from "react-router-dom";
import ProductImage from "./image";
import ProductDetail from "./detail";
import { AddToFavorites } from "../../../actions/user_actions";
import { getCategories } from "../../../actions/category_actions";
import UserBlock from "../../utils/user_block";
import CategoriesBlock from "../../utils/categories_block";
import Card from "../../utils/card";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faCaretLeft from "@fortawesome/fontawesome-free-solid/faCaretLeft";
import faSearch from "@fortawesome/fontawesome-free-solid/faSearch";

class Product extends Component {
  componentDidMount() {
    this.props.dispatch(getCategories());

    //const userId = this.props.user.userData._id;
    //const userId = this.props.user.userData._id;
    const prodId = this.props.match.params.id;
    console.log(prodId);
    this.props.dispatch(getChatsById(prodId, "single"));
  }
  addToCartHandler(id) {
    this.props.user.userData.isAuth
      ? this.props.dispatch(AddToFavorites(id)).then((response) => {
          this.props.history.push("/shop/cart");
        })
      : this.props.history.push("/login");
  }
  handleMobileSrch = (event) => {
    event.preventDefault();
    const srchStr = this.refs.mobileSrch.value;

    this.props.history.push(`/chats/search/${srchStr}`);
  };
  handleComment = (event) => {
    event.preventDefault();
  };
  render() {
    const { user, categories } = this.props;

    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <UserBlock user={user.userData} />
            </div>
            <div className="right">
              <div className="page_top">
                <div className="srch mobile">
                  <form onSubmit={this.handleMobileSrch}>
                    <input type="text" ref="mobileSrch" />
                    <button type="submit" className="transp-btn ">
                      <FontAwesomeIcon icon={faSearch} className="icon" />
                    </button>
                  </form>
                </div>
                <div>
                  <Link
                    to={"/chats"}
                    style={{
                      fontSize: "10px",
                      color: "blue",
                      marginLeft: "15px",
                    }}
                  >
                    {" "}
                    <FontAwesomeIcon icon={faCaretLeft} className="icon" /> Back
                  </Link>
                </div>
                {this.props.chats && this.props.chats.byId
                  ? this.props.chats.byId.map((chat) => (
                      // <div className="product_detail_wrapper">
                      //   <div className="product_image_container">
                      //     <ProductImage images={chat.images} />
                      //   </div>
                      //   <div className="right">
                      //     <ProductDetail
                      //       AddToFavorites={(id) => this.addToCartHandler(id)}
                      //       chat={chat}
                      //     />
                      //   </div>
                      // </div>
                      <div className="card_item_wrapper" key={chat._id}>
                        {<Card {...chat} detail={true} />}
                        <div>
                          <form onSubmit={this.handleComment}>
                            <input
                              type="text"
                              ref="comment"
                              placeholder="Add you comment"
                            />
                            <button type="submit" className="transp-btn ">
                              go
                            </button>
                          </form>
                        </div>
                        <div>
                          {chat && chat.comments && chat.comments.length > 0 && (
                            <div>
                              {chat.comments.map((c, index) => (
                                <div key={index} style={{ fontSize: "12px" }}>
                                  <strong>{c.user}</strong>{" "}
                                  <span>{c.text}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  : "Loading"}
              </div>
            </div>
            <div className="sidebar_right">
              <CategoriesBlock list={categories.byName} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    chats: state.chats,
    user: state.user,
    categories: state.categories,
  };
};
export default connect(mapStateToProps)(withRouter(Product));
