import React, { Component } from "react";
import { connect } from "react-redux";
import { getChatById } from "../../actions/chat_actions";

class CartItem extends Component {
  componentDidMount() {
    const props = this.props;
    // this.props.dispatch(getProductById(props.id, "single"));
  }
  renderCardImage(images) {
    if (images.length > 0) {
      return images[0].url;
    }
  }
  render() {
    const props = this.props;

    return (
      <div>
        {/* {this.props.products.byId
          ? this.props.products.byId.map(product => (
              <div> */}
        <td>
          <div
            className="image"
            style={{
              background: `url(${this.renderCardImage(props.images)}) no-repeat`
            }}
          />
        </td>

        <td>{props.text}</td>
      </div>
      //       ))
      //     : "loading"}
      // </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    chat: state.chats
  };
};
export default connect(mapStateToProps)(CartItem);
