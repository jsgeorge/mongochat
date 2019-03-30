import React from "react";
import { Link } from "react-router-dom";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
const AdminProductDetail = props => {
  const product = props.product;

  return (
    <div>
      <div className="button_wrapp">
        <Link to={`/admin/products/${product._id}/edit`} className="button">
          Edit
        </Link>

        <button
          className="button"
          onClick={() => {
            props.deleteProduct(product._id);
          }}
        >
          Delete
        </button>
      </div>
      <h3>
        Product Name: {product.brand.name} {product.name}
      </h3>
      <div className="prod_info">
        <div className="brand" />
        <div className="name">Description: {product.description}</div>
      </div>
      <div className="product_tags">
        {product.shipping ? (
          <div className="tag">
            <div>Shipping: Free shipping</div>
          </div>
        ) : null}
        {product.available ? (
          <div className="tag">
            <div>Availaibility: In Stock</div>
          </div>
        ) : (
          <div className="tag">
            <div>Not Available</div>
          </div>
        )}
      </div>
      <div>
        <div className="actions">
          <span className="price">Price ${product.price}</span>
        </div>

        <div>
          <h4>SPECS</h4>
          {product.description}
        </div>
      </div>
    </div>
  );
};
export default AdminProductDetail;
