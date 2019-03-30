import React from "react";
import CardBlockAdmin from "../../utils/card_block_admin";

const LoadMoreCards = props => {
  return (
    <div>
      <div>
        <CardBlockAdmin grid={props.grid} list={props.products} />
      </div>
    </div>
  );
};

export default LoadMoreCards;
