import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

class CategoriesBlock extends Component {
  state = {};

  componentDidMount() {
    //if (this.props.initState) {
    // }
  }
  handleClick = () => {};

  handleToggle = value => () => {};

  renderNavs = () =>
    this.props.list
      ? this.props.list.map(nav => (
          <div>
            <ListItem key={nav._id} style={{ padding: "10px 15px" }}>
              <ListItemText primary={nav.name} />
            </ListItem>
          </div>
        ))
      : null;

  render() {
    return (
      <div className="nav_block ">
        {/* <List
          className="mobile_nav "
          style={{ borderBottom: "1px solid #dbdbdb" }}
        >
          <h3>Categories</h3>
          <List component="div">
            {this.props.list ? (
              this.props.list.length === 0 ? (
                <div className="no_result">No categories found</div>
              ) : null
            ) : null}
            {this.renderNavs()}
          </List>
        </List> */}
        {/* <List
          className="side_nav"
          style={{ borderBottom: "1px solid #dbdbdb" }}
        >
          <ListItem>
            <ListItemText
              primary={this.props.title}
              className="collapse_title"
            />
          </ListItem> */}
        <h3>Categories</h3>
        <List component="div">
          {this.props.list ? (
            this.props.list.length === 0 ? (
              <div className="no_result">No categories found</div>
            ) : null
          ) : null}
          {this.renderNavs()}
        </List>
        {/* </List>*/}
      </div>
    );
  }
}

export default CategoriesBlock;
