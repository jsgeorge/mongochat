import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../actions/user_actions";
import UsersBlock from "../utils/users_block";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faSearch from "@fortawesome/fontawesome-free-solid/faSearch";

class UserList extends Component {
  componentDidMount() {
    this.props.dispatch(getUsers());
  }
  desktopSearch = () => <FontAwesomeIcon icon={faSearch} className="icon" />;

  handleDesktopSrch = event => {
    event.preventDefault();
    const srchStr = this.refs.desktopSrch.value;
    if (srchStr && srchStr.length > 0) {
      this.setState({ err: false });
      this.props.history.push(`/users/search/${srchStr}`);
    }
  };
  render() {
    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="srch-form">
            <form onSubmit={this.handleDesktopSrch}>
              <input
                type="text"
                ref="desktopSrch"
                placeholder="Search people"
              />
              <button type="submit">{this.desktopSearch()}</button>
            </form>
          </div>
          <UsersBlock
            list={this.props.users.list}
            curUserEmail={this.props.user.userData.email}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    users: state.users
  };
};
export default connect(mapStateToProps)(UserList);
