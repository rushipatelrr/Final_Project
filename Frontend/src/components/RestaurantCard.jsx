import React from "react";
import { useNavigate } from "react-router-dom";

import "./RestaurantCard.css";
import foodPlaceholder from "../assets/images/food.gif";

const RestaurantCard = ({
  id,
  image,
  name,
  description,
  category,
  rating = 4.3,
  reviews = 110,
  price = 400,
  offer = "20% off up to ₹100",
  veg = true,
  tags = [],
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurant/${id}/menu`);
  };

  return (
    <div className="restaurant-card" onClick={handleClick}>
      <img
        src={image || foodPlaceholder}
        alt={name}
        className="restaurant-image"
      />
      <div className="restaurant-info">
        <div className="restaurant-header">
          <h3>{name}</h3>
          <span className={`veg-dot ${veg ? "veg" : "non-veg"}`}></span>
        </div>
        <div className="restaurant-tags">
          {tags.map((tag) => (
            <span className="restaurant-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <p className="restaurant-cuisine">{category}</p>
        <p className="restaurant-description">{description}</p>
        <div className="restaurant-details-row">
          <span className="restaurant-rating">
            ⭐ {rating} ({reviews} reviews)
          </span>
          <span className="restaurant-price">₹{price} for two</span>
        </div>
        {offer && <div className="restaurant-offer">{offer}</div>}
      </div>
    </div>
  );
};

export default RestaurantCard;
