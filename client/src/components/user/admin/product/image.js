import React from "react";

const AdminProductImage = props => {
  const product = props.product;
  const renderCardImage = images => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/image_not_availble.png";
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

export default AdminProductImage;
