import React, { Component } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../actions/category_actions";
import { getChats } from "../../actions/chat_actions";
import UserBlock from "../utils/user_block";
import LoadMoreCards from "./load_more_cards";
import { price } from "../utils/fixed_categories";
import MyButton from "../utils/button";
import CategoriesBlock from "../utils/categories_block";
class Chats extends Component {
  ctgryId = ""; //"5c4b41ad2fc464438df10601"
  state = {
    grid: "",
    limit: 9,
    skip: 0,
    ctgryId: "",
    srchStr: "",
    filters: {
      brand: [],
      category: [],
      price: []
    }
  };

  componentDidMount() {
    this.props.dispatch(getCategories());
    if (!this.props.match.params.srchStr) {
      this.props.dispatch(
        getChats(this.state.skip, this.state.limit, this.state.filters)
      );
    } else {
      const srchStr = this.props.match.params.srchStr;
      const srchFilter = {
        name: srchStr
      };
      this.setState({ srchStr: srchStr });
      this.props.dispatch(
        getChats(this.state.skip, this.state.limit, srchFilter)
      );
    }
  }

  getCategoryId = category => {
    let categories = this.props.categories.byName;
    if (categories) {
      if (categories.length > 0) {
        categories.map(c => {
          if ((c.name = category)) return c._id;
        });
      } else {
        return 0;
      }
    } else {
      return -1;
    }
  };
  handlePrice = value => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };
  handleFilters = (filters, type) => {
    const newFilters = { ...this.state.filters };
    newFilters[type] = filters;

    this.showFilteredResults(newFilters);

    this.setState({
      filters: newFilters
    });
  };

  showFilteredResults = filters => {
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
        this.state(skip);
      });
  };
  render() {
    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <UserBlock user={this.props.user.userData} />
              {/* <ChkBxBlock
                initState={true}
                list={this.props.categories.byName}
                title="Categories"
                handleFilters={filters =>
                  this.handleFilters(filters, "category")
                }
              />  */}
            </div>
            <div className="right">
              <h4>
                {this.state.srchStr ? (
                  <span>Search: {this.state.srchStr}</span>
                ) : null}
              </h4>
              <LoadMoreCards
                grid={this.state.grid}
                limit={this.state.limit}
                size={this.props.chats.viewSize}
                chats={this.props.chats.view}
                loadMore={() => this.loadMoreCards()}
              />
            </div>
            <div className="sidebar_right">
              <CategoriesBlock list={this.props.categories.byName} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    brands: state.brands,
    categories: state.categories,
    chats: state.chats,
    user: state.user
  };
};
export default connect(mapStateToProps)(Chats);
