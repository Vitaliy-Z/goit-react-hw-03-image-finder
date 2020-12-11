import React from "react";

export default function ImageGalleryItem({ images, getLargeImageURL }) {
  return images.map((image) => (
    <li className="ImageGalleryItem" key={image.id}>
      <img
        src={image.webformatURL}
        data-src={image.largeImageURL}
        alt={image.tag}
        className="ImageGalleryItem-image"
        onClick={(e) => getLargeImageURL(e.target.dataset.src)}
      />
    </li>
  ));
}
