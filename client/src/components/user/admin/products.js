import React, { Component } from "react";
import { connect } from "react-redux";
import { getBrands } from "../../../actions/brand_actions";
import { getCategories } from "../../../actions/category_actions";
import { getProducts } from "../../../actions/product_actions";
import LoadMoreCards from "./load_more_cards";
import LayoutAdmin from "../../../Hoc/adminLayout";

class ManageProducts extends Component {
  ctgryId = ""; //"5c4b41ad2fc464438df10601"
  state = {
    grid: "",
    limit: 20,
    skip: 0,
    ctgryId: "",
    filters: {
      brand: [],
      category: [],
      price: []
    }
  };

  componentDidMount() {
    this.props.dispatch(getBrands());
    this.props.dispatch(getCategories());
    this.ctgryId = this.getCategoryId("Phones");
    this.ctgryFilters(this.ctgryId);
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
  ctgryFilters = filters => {
    const newFilters = { ...this.state.filters };
    newFilters["category"] = filters;

    this.showFilteredResults(newFilters);

    this.setState({
      filters: newFilters
    });
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
    this.props.dispatch(getProducts(0, this.state.limit, filters)).then(() => {
      this.setState({ skip: 0 });
    });
  };

  render() {
    return (
      <LayoutAdmin>
        <div>
          Displying
          {this.props.products.toShopSize} products
          <br />
          <LoadMoreCards
            grid={this.state.grid}
            limit={this.state.limit}
            size={this.props.products.toShopSize}
            products={this.props.products.toShop}
            loadMore={() => console.log("load More")}
          />
        </div>
      </LayoutAdmin>
    );
  }
}
const mapStateToProps = state => {
  return {
    brands: state.brands,
    categories: state.categories,
    products: state.products
  };
};
export default connect(mapStateToProps)(ManageProducts);
