import React, { Component } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../actions/category_actions";
import { getChats } from "../../actions/chat_actions";
import UserBlock from "../utils/user_block";
import LoadMoreCards from "./load_more_cards";
//import MyButton from "../utils/button";
import CategoriesBlock from "../utils/categories_block";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faSearch from "@fortawesome/fontawesome-free-solid/faSearch";

class Chats extends Component {
  ctgryId = ""; //"5c4b41ad2fc464438df10601"
  state = {
    timer: null,
    grid: "",
    limit: 9,
    skip: 0,
    ctgryId: "",
    srchStr: "",
    filters: {
      brand: [],
      category: [],
      price: [],
    },
  };

  componentDidMount() {
    this.props.dispatch(getCategories());
    const { params } = this.props.match;

    if (params.ctgryId) {
      const filter = {
        category: params.ctgryId,
      };
      this.setState({ ctgryId: params.ctgryId });
      this.props.dispatch(getChats(this.state.skip, this.state.limit, filter));
    } else if (params.srchStr) {
      const srchStr = params.srchStr;
      const srchFilter = {
        text: srchStr,
      };
      this.setState({ srch: srchStr });
      this.props.dispatch(
        getChats(this.state.skip, this.state.limit, srchFilter)
      );
    } else {
      this.props.dispatch(
        getChats(this.state.skip, this.state.limit, this.state.filters)
      );
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  loadChats = () => {
    this.props.dispatch(
      getChats(this.state.skip, this.state.limit, this.state.filters)
    );
  };

  handleFilters = (filters, type) => {
    const newFilters = { ...this.state.filters };
    newFilters[type] = filters;

    this.showFilteredResults(newFilters);

    this.setState({
      filters: newFilters,
    });
  };

  showFilteredResults = (filters) => {
    //console.log(filters);
    this.props.dispatch(getChats(0, this.state.limit, filters)).then(() => {
      this.setState({ skip: 0 });
    });
  };

  loadMoreCards = () => {
    let skip = this.state.skip + this.state.limit;
    this.props
      .dispatch(
        getChats(
          skip,
          this.state.limit,
          this.state.filters,
          this.props.chats.view
        )
      )
      .then(() => {
        this.setState({ skip: skip });
      });
  };
  handleMobileSrch = (event) => {
    event.preventDefault();
    const srchStr = this.refs.mobileSrch.value;
    const srchFilter = {
      text: srchStr,
    };
    this.setState({ srchStr: srchStr });
    this.props.dispatch(
      getChats(this.state.skip, this.state.limit, srchFilter)
    );
  };
  render() {
    const { user, categories, chats } = this.props;
    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <UserBlock user={user.userData} />
            </div>
            <div className="right">
              <div className="srch mobile">
                <form onSubmit={this.handleMobileSrch}>
                  <input type="text" ref="mobileSrch" />
                  <button type="submit" className="transp-btn ">
                    <FontAwesomeIcon icon={faSearch} className="icon" />
                  </button>
                </form>
              </div>
              <h4>
                {/* {this.props.match.params.srchStr ? (
                  <span>Search: {this.props.match.params.srchStr}</span>
                ) : null} */}
                {this.props.match.params.ctgry ? (
                  <span>Category: {this.props.match.params.ctgry}</span>
                ) : null}
              </h4>

              <LoadMoreCards
                grid={this.state.grid}
                limit={this.state.limit}
                size={chats.viewSize}
                chats={chats.view}
                loadMore={() => this.loadMoreCards()}
              />
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
  return {
    categories: state.categories,
    chats: state.chats,
    user: state.user,
  };
};
export default connect(mapStateToProps)(Chats);
