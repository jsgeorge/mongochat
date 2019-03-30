import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { UserLogout } from "../../actions/user_actions";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faBars from "@fortawesome/fontawesome-free-solid/faBars";
import faShoppingCart from "@fortawesome/fontawesome-free-solid/faShoppingCart";
import faUser from "@fortawesome/fontawesome-free-solid/faUser";
import faSearch from "@fortawesome/fontawesome-free-solid/faSearch";
import faPlus from "@fortawesome/fontawesome-free-solid/faPlus";

import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { orange } from "@material-ui/core/colors";

class Header extends Component {
  state = {
    open: false,
    page2: [
      {
        name: "Home",
        linkTo: "/",
        public: true
      },
      {
        name: "Chats",
        linkTo: "/chats",
        public: true
      },
      {
        name: "Add",
        linkTo: "/chat/add",
        public: true
      },
      {
        name: "Favorites",
        linkTo: "/user/favorites",
        public: false
      }
    ],
    user: [
      {
        name: "Account",
        linkTo: "/user/dashboard",
        public: false
      },
      {
        name: "Log in",
        linkTo: "/login",
        public: true
      },
      {
        name: "Log out",
        linkTo: "/user/logout",
        public: false
      }
    ],
    mobile: [
      {
        name: "Home",
        linkTo: "/",
        public: true
      },
      {
        name: "Shop",
        linkTo: "/shop/products",
        public: true
      },
      {
        name: "Log out",
        linkTo: "/user/logout",
        public: false
      }
    ]
  };

  componentDidMount() {
    if (this.props.initState) {
      this.setState({ open: this.props.initState });
    }
  }
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleBars = () =>
    this.state.open ? (
      <FontAwesomeIcon icon={faBars} className="icon" />
    ) : (
      <FontAwesomeIcon icon={faBars} className="icon" />
    );
  mobileCart = () => <FontAwesomeIcon icon={faShoppingCart} className="icon" />;
  mobileUser = () => <FontAwesomeIcon icon={faUser} className="icon" />;
  desktopSearch = () => <FontAwesomeIcon icon={faSearch} className="icon" />;
  desktopAdd = () => <FontAwesomeIcon icon={faPlus} className="icon" />;

  logoutHandler = () => {
    this.props.dispatch(UserLogout()).then(response => {
      if (response.payload.success) {
        this.props.history.push("/");
      }
    });
  };
  handleDesktopSrch = event => {
    event.preventDefault();
    const srchStr = this.refs.desktopSrch.value;
    this.props.history.push(`/shop/products/search/${srchStr}`);
  };
  handleMobileSrch = event => {
    event.preventDefault();
    const srchStr = this.refs.mobileSrch.value;
    this.props.history.push(`/shop/products/search/${srchStr}`);
  };

  defaultLink = (item, i) =>
    item.name === "Log out" ? (
      <div
        className="log_out_link"
        key={i}
        onClick={() => this.logoutHandler()}
      >
        {item.name}
      </div>
    ) : (
      <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>
    );

  cartLink = (item, i) => {
    const user = this.props.user.userData;

    return (
      <div className="cart_link" key={i}>
        <Link to={item.linkTo}>
          <span>{user.cart ? user.cart.length : 0}</span>
          <FontAwesomeIcon icon={faShoppingCart} />
        </Link>
      </div>
    );
  };

  accountLink = (item, i) => {
    const user = this.props.user.userData;

    return (
      <div className="account_link" key={i}>
        <Link to={item.linkTo}>
          {user ? (
            <span>
              {" "}
              <FontAwesomeIcon icon={faUser} />{" "}
            </span>
          ) : null}
        </Link>
      </div>
    );
  };
  addLink = (item, i) => {
    const user = this.props.user.userData;

    return (
      <div className="add_link" key={i}>
        <Link to={item.linkTo}>
          {user ? (
            <span>
              {" "}
              <FontAwesomeIcon icon={faPlus} />{" "}
            </span>
          ) : null}
        </Link>
      </div>
    );
  };
  mobileLink = (item, i) =>
    item.name === "Log out" ? (
      <ListItem
        style={{
          background: "transparent",
          color: "#fff",
          padding: "15px 0",
          borderBottom: "1px solid #555"
        }}
        key={i}
        className="log_out_link"
        key={i}
        onClick={() => this.logoutHandler()}
      >
        Log Out
      </ListItem>
    ) : (
      <ListItem
        key={i}
        style={{
          background: "transparent",
          color: "#fff",
          padding: "15px 0",
          borderBottom: "1px solid #555"
        }}
      >
        <Link to={item.linkTo} key={i}>
          {item.name}
        </Link>
      </ListItem>
    );
  showLinks = (type, isMobile) => {
    let list = [];

    if (this.props.user.userData) {
      type.forEach(item => {
        if (!this.props.user.userData.isAuth) {
          if (item.public === true) {
            list.push(item);
          }
        } else {
          if (item.name !== "Log in") {
            list.push(item);
          }
        }
      });
    }
    // type.forEach(item => {
    //   list.push(item);
    // });

    return list.map((item, i) => {
      // if (item.name !== "Cart") {
      //   if (!isMobile) return this.defaultLink(item, i);
      //   else return this.mobileLink(item, i);
      // } else {
      //   return this.cartLink(item, i);
      // }
      if (item.name === "Add") {
        return this.addLink(item, i);
      } else if (item.name === "Cart") {
        return this.cartLink(item, i);
      } else if (item.name === "Account") {
        return this.accountLink(item, i);
      } else {
        if (!isMobile) return this.defaultLink(item, i);
        else return this.mobileLink(item, i);
      }
    });
  };

  render() {
    return (
      <div>
        {this.props.user.userData && this.props.user.userData.isAuth ? (
          <header>
            <AppBar
              position="fixed"
              style={{
                backgroundColor: "#fff",
                boxShadow: "none",
                padding: "10px 0px",
                borderBottom: "1px solid #aaa",
                color: "#111"
              }}
            >
              <Toolbar>
                <div className="container">
                  <div className="left">
                    <div className="logo">
                      <Link to="/">MongoChat</Link>
                    </div>
                  </div>
                  {/* <div className="srch-form">
                  <form onSubmit={this.handleDesktopSrch}>
                    <input
                      type="text"
                      ref="desktopSrch"
                      placeholder="Search products"
                    />
                    <button type="submit">{this.desktopSearch()}</button>
                  </form>
                </div> */}
                  <div className="mobileNav right mobile">
                    {/* <Link to={"/cart"}>{this.mobileCart()}</Link> */}

                    {this.props.user.userData &&
                    this.props.user.userData.isAuth ? (
                      <span>
                        {/* {this.cartLink("Cart", 0)}
                      <Link to={"/user/dashboard"}>{this.mobileUser()}</Link>
                      <button
                        className="transp-btn"
                        onClick={() => this.logoutHandler()}
                      >
                        Logout
                      </button> */}
                        {this.showLinks(this.state.user, false)}
                        {/* <List
                        style={{
                          padding: "0",
                          width: "100px"
                        }}
                      >
                        <ListItem
                          onClick={this.handleClick}
                          style={{ width: "100%" }}
                        >
                          {this.handleBars()}
                        </ListItem>
                        <Collapse
                          in={this.state.open}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List
                            component="div"
                            style={{ background: "transparent", padding: "0" }}
                          >
                            {this.showLinks(this.state.mobile, true)}
                          </List>
                        </Collapse>
                      </List> */}
                      </span>
                    ) : (
                      <Link to={"/login"}>Login</Link>
                    )
                    /*{" "}
                  <List style={{ padding: "0", width: "100px" }}>
                    <ListItem
                      onClick={this.handleClick}
                      style={{ width: "100px" }}
                    >
                      {this.handleBars()}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                      <List
                        component="div"
                        style={{ background: "transparent", padding: "0" }}
                      >
                        {this.showLinks(this.state.page2, true)}
                      </List>
                    </Collapse>
                  </List>{" "}
                  */
                    }
                  </div>
                  <div className="right dektop tablet">
                    <div className="top">
                      {this.showLinks(this.state.user, false)}
                    </div>
                    <div className="bottom desktop desktopLinks">
                      {this.showLinks(this.state.page2, false)}
                    </div>
                  </div>
                </div>
              </Toolbar>

              {/* <div className="srch">
              <form onSubmit={this.handleMobileSrch}>
                <input
                  type="text"
                  ref="mobileSrch"
                  placeholder="Search products"
                />
                <button type="submit">{this.desktopSearch()}</button>
              </form>
            </div> */}
              <div className="nav2 mobile">
                {/* <Link to={"/"}>Home</Link>
              <Link to={"/products"}>Shop</Link>
              <Link to={"Specials"}>Specials</Link> */}
                {this.showLinks(this.state.page2, false)}
              </div>
            </AppBar>
          </header>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(withRouter(Header));
//export default withRouter(Header);
