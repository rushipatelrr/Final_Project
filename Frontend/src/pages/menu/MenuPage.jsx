import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/comman/Navbar";
import RestaurantMenu from "../../components/RestaurantMenu";
import restaurantList from "../../assets/restaurant";
import menus from "../../assets/menu";

const MenuPage = () => {
  const { id } = useParams();
  const restaurant = restaurantList.find((res) => res.id.toString() === id);
  const menuItems = menus[id];

  return (
    <>
      <Navbar />
      <div className="menu-wrapper">
        {restaurant ? (
          <RestaurantMenu restaurantName={restaurant.name} items={menuItems} />
        ) : (
          <div className="menu-error">
            <h2>Restaurant not found</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default MenuPage;
