import React from "react";

const ImagesComponent = () => {
  const images = [
    "./image1.jpg",
    "./image2.jpg",
    "./image3.jpg",
    "./image4.jpg",
    "./image5.jpg",
  ];

  // Duplicamos las imágenes al menos 2 veces para evitar huecos
  const duplicatedImages = [...images, ...images, ...images];

  return (
    <div className="cnt-slider">
      {duplicatedImages.map((image, index) => (
        <div className="slide" key={`image-${index}`}>
          <img src={image} alt={`Slide ${index}`} />
        </div>
      ))}
    </div>
  );
};

export default ImagesComponent;
