import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/auth/LandingPage.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import HomePage from "../pages/home/HomePage.jsx";
import FoodPage from "../pages/food/FoodPage.jsx";
import EssentialsPage from "../pages/essentials/EssentialsPage.jsx";
import MenuPage from "../pages/menu/MenuPage.jsx";
import CartPage from "../pages/cart/CartPage.jsx";
import Checkout from "../pages/checkout/CheckoutPage.jsx";
import OrderDetailsPage from "../pages/orderdetails/OrderDetailsPage.jsx";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import PendingDeliveryBoys from "../pages/admin/sections/PendingDeliveryBoys.jsx";
import AllDeliveryBoys from "../pages/admin/sections/AllDeliveryBoys.jsx";
import AllRestaurants from "../pages/admin/sections/AllRestaurants.jsx";
import DeliveryBoyDetails from "../pages/delivery/DeliveryBoyDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/food" element={<FoodPage />} />
      <Route path="/essentials" element={<EssentialsPage />} />
      <Route path="/restaurant/:id/menu" element={<MenuPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<OrderDetailsPage />} />
      <Route path="/delivery/details" element={<DeliveryBoyDetails />} />
      <Route path="/admin" element={<AdminDashboard />}>
        <Route path="pending-delivery-boys" element={<PendingDeliveryBoys />} />
        <Route path="all-delivery-boys" element={<AllDeliveryBoys />} />
        <Route path="restaurants" element={<AllRestaurants />} />
      </Route>
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default AppRoutes;
