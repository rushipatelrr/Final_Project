// AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  MdPendingActions,
  MdPeopleAlt,
  MdRestaurant,
  MdMenu,
  MdListAlt,
} from "react-icons/md";
import initialRestaurantList from "../../assets/restaurant";

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Restaurant state
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [restaurantForm, setRestaurantForm] = useState({
    name: "",
    description: "",
    category: "",
    image: null,
    imagePreview: null,
  });
  const [editRestaurantId, setEditRestaurantId] = useState(null);
  const [restaurantList, setRestaurantList] = useState(initialRestaurantList);

  // Delivery boys state
  const [pendingDeliveryBoys, setPendingDeliveryBoys] = useState([]);
  const [approvedDeliveryBoys, setApprovedDeliveryBoys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // ------------------------
  // Restaurant Form Handlers
  // ------------------------
  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setRestaurantForm((prev) => ({
        ...prev,
        image: file,
        imagePreview: file ? URL.createObjectURL(file) : null,
      }));
    } else {
      setRestaurantForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setRestaurantList((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: restaurantForm.name,
        description: restaurantForm.description,
        category: restaurantForm.category,
      },
    ]);
    setShowForm(false);
    setRestaurantForm({
      name: "",
      description: "",
      category: "",
      image: null,
      imagePreview: null,
    });
  };

  const handleEditClick = (rest) => {
    setEditRestaurantId(rest.id);
    setRestaurantForm({
      name: rest.name,
      description: rest.description,
      category: rest.category,
      image: null,
      imagePreview: null,
    });
    setEditForm(true);
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    setRestaurantList((prev) =>
      prev.map((r) =>
        r.id === editRestaurantId
          ? {
              ...r,
              name: restaurantForm.name,
              description: restaurantForm.description,
              category: restaurantForm.category,
            }
          : r
      )
    );
    setEditForm(false);
    setEditRestaurantId(null);
    setRestaurantForm({
      name: "",
      description: "",
      category: "",
      image: null,
      imagePreview: null,
    });
  };

  const handleDelete = (id) => {
    setRestaurantList((prev) => prev.filter((r) => r.id !== id));
  };

  // ------------------------
  // Fetch Delivery Boys (Pending + Approved)
  // ------------------------
  const fetchDeliveryBoys = async () => {
    setLoading(true);
    setError("");
    try {
      // Pending
      const pendingRes = await fetch("http://localhost:5000/api/pending-deliveryboys");
      if (!pendingRes.ok) throw new Error("Failed to fetch pending delivery boys");
      const pendingData = await pendingRes.json();

      // Approved
      const approvedRes = await fetch("http://localhost:5000/api/deliveryboys/all");
      if (!approvedRes.ok) throw new Error("Failed to fetch approved delivery boys");
      const approvedData = await approvedRes.json();

      setPendingDeliveryBoys(pendingData);
      setApprovedDeliveryBoys(approvedData);
    } catch (err) {
      setError(err.message || "Could not load delivery boys.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveryBoys();
  }, []);

  // ------------------------
  // Approve / Reject Pending Delivery Boys
  // ------------------------
  const handleAction = async (id, action) => {
    setLoading(true);
    setError("");
    try {
      let url = `http://localhost:5000/api/pending-deliveryboys/`;
      let method = "";

      if (action === "accept") {
        url += `approve/${id}`;
        method = "PUT";
      } else if (action === "reject") {
        url += `reject/${id}`;
        method = "DELETE";
      }

      const res = await fetch(url, { method });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Action failed");

      // Refresh lists after action
      await fetchDeliveryBoys();
    } catch (err) {
      setError(err.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------
  // JSX
  // ------------------------
  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className={`admin-sidebar${sidebarOpen ? "" : " closed"}`}>
        <div className="admin-sidebar-header">
          {sidebarOpen && <h2 className="admin-sidebar-title">Admin Menu</h2>}
          <button
            className="admin-sidebar-menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ marginLeft: sidebarOpen ? 0 : "auto" }}
          >
            <MdMenu size={28} />
          </button>
        </div>
        {sidebarOpen && (
          <div className="admin-sidebar-links">
            <button
              className={`admin-sidebar-btn${
                location.pathname === "/admin/pending-delivery-boys" ? " active" : ""
              }`}
              onClick={() => {
                setShowForm(false);
                navigate("/admin/pending-delivery-boys");
              }}
            >
              <MdPendingActions style={{ marginRight: 10, fontSize: 22 }} />
              <span>Pending Boys</span>
            </button>

            <button
              className={`admin-sidebar-btn${
                location.pathname === "/admin/all-delivery-boys" ? " active" : ""
              }`}
              onClick={() => {
                setShowForm(false);
                navigate("/admin/all-delivery-boys");
              }}
            >
              <MdPeopleAlt style={{ marginRight: 10, fontSize: 22 }} />
              <span>All Delivery Boys</span>
            </button>

            <button
              className={`admin-sidebar-btn${
                location.pathname === "/admin/restaurants" ? " active" : ""
              }`}
              onClick={() => {
                setShowForm(false);
                navigate("/admin/restaurants");
              }}
            >
              <MdListAlt style={{ marginRight: 10, fontSize: 22 }} />
              <span>All Restaurants</span>
            </button>

            <button
              className="add-restaurant-btn admin-sidebar-add"
              onClick={() => setShowForm(true)}
            >
              <MdRestaurant style={{ marginRight: 10, fontSize: 22 }} />
              <span>Add New Restaurant</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="admin-main-content">
        <h1>Admin Dashboard</h1>

        {/* Add Restaurant Form */}
        {showForm && (
          <div className="add-restaurant-form-wrapper">
            <form className="add-restaurant-form" onSubmit={handleFormSubmit}>
              <h2>Add New Restaurant</h2>
              <label>Restaurant Name:</label>
              <input
                type="text"
                name="name"
                placeholder="Restaurant Name"
                value={restaurantForm.name}
                onChange={handleFormChange}
                required
              />
              <label>Category:</label>
              <input
                type="text"
                name="category"
                placeholder="Category (e.g. Punjabi, Chinese)"
                value={restaurantForm.category}
                onChange={handleFormChange}
                required
              />
              <label>Description:</label>
              <textarea
                name="description"
                placeholder="Description"
                value={restaurantForm.description}
                onChange={handleFormChange}
                required
              />
              <label>Image:</label>
              <input type="file" name="image" accept="image/*" onChange={handleFormChange} />
              {restaurantForm.imagePreview && (
                <img
                  src={restaurantForm.imagePreview}
                  alt="Preview"
                  style={{ maxWidth: 120, marginTop: 8, borderRadius: 8 }}
                />
              )}
              <div style={{ marginTop: 12 }}>
                <button type="submit" style={{ marginRight: 8 }}>
                  Add
                </button>
                <button type="button" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Pass lists + handlers to child routes */}
        <Outlet
          context={{
            pendingDeliveryBoys,
            approvedDeliveryBoys,
            loading,
            error,
            handleAction,
            restaurantList,
            handleEditClick,
            handleDelete,
          }}
        />
      </div>

      {/* Edit Restaurant Modal */}
      {editForm && (
        <div className="add-restaurant-form-wrapper">
          <form className="add-restaurant-form" onSubmit={handleEditFormSubmit}>
            <h2>Edit Restaurant</h2>
            <label>Restaurant Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Restaurant Name"
              value={restaurantForm.name}
              onChange={handleFormChange}
              required
            />
            <label>Category:</label>
            <input
              type="text"
              name="category"
              placeholder="Category (e.g. Punjabi, Chinese)"
              value={restaurantForm.category}
              onChange={handleFormChange}
              required
            />
            <label>Description:</label>
            <textarea
              name="description"
              placeholder="Description"
              value={restaurantForm.description}
              onChange={handleFormChange}
              required
            />
            <div style={{ marginTop: 12 }}>
              <button type="submit" style={{ marginRight: 8 }}>
                Save
              </button>
              <button type="button" onClick={() => setEditForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
