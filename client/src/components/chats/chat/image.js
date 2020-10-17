import React from "react";

const ProductImage = (props) => {
  const images = props.images;
  const renderCardImage = (images) => {
    if (images.length > 0) {
      return images[0].url;
    }
  };
  if (!images || !images[0]) return null;
  return (
    <div className="main_pic">
      <div
        style={{
          background: `url(${renderCardImage(images)}) no-repeat`,
        }}
      />
    </div>
  );
};

export default ProductImage;
