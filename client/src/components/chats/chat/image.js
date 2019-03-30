import React from "react";

const ProductImage = props => {
  const product = props.product;
  const renderCardImage = images => {
    if (images.length > 0) {
      return images[0].url;
    }
  };
  return (
    <div className="main_pic">
      <div
        style={{
          background: `url(${renderCardImage(product.images)}) no-repeat`
        }}
      />
    </div>
  );
};

export default ProductImage;
