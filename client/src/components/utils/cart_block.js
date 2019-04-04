import React from "react";
///import CartItem from "./cart_item";

const CartBlock = ({ chats, removeItem }) => {
  const renderCardImage = images => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/image_not_availble.png";
    }
  };
  const renderItems = props =>
    chats.chatDetail
      ? chats.chatDetail.map(chat => (
          <div className="user_product_block" key={chat._id}>
            <div className="item image">
              <div
                className="image"
                style={{
                  background: `url(${renderCardImage(chat.images)}) no-repeat`
                }}
              />
            </div>
            <div className="item name">
              {chat.author.username ? (
                <span>{chat.author.username}</span>
              ) : (
                <span>
                  {chat.author.name} {chat.author.lastname}
                </span>
              )}
            </div>

            <div className="item  text">{chat.text} </div>

            <div>
              <button
                onClick={() => removeItem(chat._id)}
                className="cart_remove_btn"
              >
                x
              </button>
            </div>
          </div>
        ))
      : null;

  //  ? (
  // <tr>{<CartItem key={item.id} {...item} grid={props.grid} />}</tr>;
  //  )
  //  :null

  return (
    <div className="card_block_shop">
      <div className="card_items_wrapper">{renderItems()}</div>
    </div>
  );
};

export default CartBlock;
