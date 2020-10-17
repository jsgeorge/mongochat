import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTruck from "@fortawesome/fontawesome-free-solid/faTruck";
import faCheck from "@fortawesome/fontawesome-free-solid/faCheck";
import faTimes from "@fortawesome/fontawesome-free-solid/faTimes";
import faShoppingBag from "@fortawesome/fontawesome-free-solid/faShoppingBag";

const chatDetail = (props) => {
  const chat = props.chat;
  return (
    <div className="detail">
      <h3>{chat.text}</h3>
    </div>
  );
};
export default chatDetail;
