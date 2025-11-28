import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

const AllRestaurants = () => {
  const { restaurantList, fetchRestaurants, handleEditClick } =
    useOutletContext();
  const [loadingId, setLoadingId] = useState(null);

  // Delete restaurant from DB
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this restaurant?"))
      return;
    setLoadingId(id);
    try {
      const res = await fetch(`http://localhost:5000/api/restaurants/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      await fetchRestaurants();
    } catch (err) {
      alert("Failed to delete restaurant.");
    } finally {
      setLoadingId(null);
    }
  };

  // Edit handler should open modal/form, then call PUT API on submit (handled in parent)

  return (
    <>
      <h2>All Restaurants</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurantList.map((rest) => (
            <tr key={rest.id}>
              <td>{rest.name}</td>
              <td>{rest.category}</td>
              <td>{rest.description}</td>
              <td>
                <button
                  onClick={() => handleEditClick(rest)}
                  style={{ marginRight: 8 }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(rest.id)}
                  style={{ background: "#e74c3c", color: "#fff" }}
                  disabled={loadingId === rest.id}
                >
                  {loadingId === rest.id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AllRestaurants;
