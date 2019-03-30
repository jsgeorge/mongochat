import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTruck from "@fortawesome/fontawesome-free-solid/faTruck";
import faCheck from "@fortawesome/fontawesome-free-solid/faCheck";
import faTimes from "@fortawesome/fontawesome-free-solid/faTimes";
import faShoppingBag from "@fortawesome/fontawesome-free-solid/faShoppingBag";

const ProductDetail = props => {
  const product = props.product;
  return (
    <div className="detail">
      <h3>
        {product.brand.name} {product.name}
      </h3>
      <div className="prod_info">
        <div className="brand" />
        <div className="name">{product.description}</div>
      </div>
      <div className="product_tags">
        {product.shipping ? (
          <div className="tag">
            <div>
              <FontAwesomeIcon icon={faTruck} />
            </div>
            <div className="tag_text">
              <div>Free shipping</div>
              <div>And Returns</div>
            </div>
          </div>
        ) : null}
        {product.available ? (
          <div className="tag">
            <div>
              <FontAwesomeIcon icon={faCheck} />
            </div>
            <div className="tag_text">
              <div>In Stock</div>
              <div>Available for purchase</div>
            </div>
          </div>
        ) : (
          <div className="tag">
            <div>
              <FontAwesomeIcon icon={faTimes} />
            </div>
            <div className="tag_text">
              <div>Not Available</div>
              <div>Pre-Order</div>
            </div>
          </div>
        )}
      </div>
      <div>
        <div className="product_actions">
          <span className="price">${product.price}</span>
        </div>
        <div className="button_wrapp">
          <button
            className="card_link"
            onClick={() => {
              props.addToCart(product._id);
            }}
          >
            <FontAwesomeIcon icon={faShoppingBag} /> Add to Cart
          </button>
        </div>
        <div className="product_specs">
          <h4>SPECS</h4>
          {product.description}
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
