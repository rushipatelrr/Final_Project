import React, { useState } from "react";
import Navbar from "../../components/comman/Navbar";
import RestaurantCard from "../../components/RestaurantCard";
import restaurantList from "../../assets/restaurant";
import "./FoodPage.css";

const cuisines = [
  "All",
  "Punjabi",
  "Chinese",
  "South Indian",
  "Gujarati",
  "Pizza",
  "Vada pav",
  "Rolls",
];

const FoodPage = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");

  const filteredRestaurants = restaurantList.filter((res) => {
    const matchesSearch = res.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesCuisine =
      selectedCuisine === "All" || res.category === selectedCuisine;
    return matchesSearch && matchesCuisine;
  });

  return (
    <>
      <Navbar />
      <div className="food-container">
        <h2 className="food-heading">Food & Beverages 🍽️</h2>

        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="search-bar"
          />
        </div>

        <div className="cuisine-slider">
          {cuisines.map((cuisine) => (
            <button
              key={cuisine}
              className={`cuisine-button ${
                selectedCuisine === cuisine ? "active" : ""
              }`}
              onClick={() => setSelectedCuisine(cuisine)}
            >
              {cuisine}
            </button>
          ))}
        </div>

        <div className="restaurant-list">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((res) => (
              <RestaurantCard key={res.id} {...res} />
            ))
          ) : (
            <p className="no-results">No restaurants found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default FoodPage;
