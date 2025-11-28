import React from "react";
import { useOutletContext } from "react-router-dom";

function PendingDeliveryBoys() {
  const { pendingDeliveryBoys, loading, error, handleAction } = useOutletContext();

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Pending Delivery Boys</h2>
      {pendingDeliveryBoys.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: "100%", marginTop: "10px" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Vehicle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingDeliveryBoys.map((boy) => (
              <tr key={boy._id}>
                <td>{boy.name}</td>
                <td>{boy.email}</td>
                <td>{boy.mobile}</td>
                <td>{boy.vehicle}</td>
                <td>
                  <button onClick={() => handleAction(boy._id, "accept")}>✅ Approve</button>
                  <button
                    onClick={() => handleAction(boy._id, "reject")}
                    style={{ marginLeft: 8, backgroundColor: "red", color: "white" }}
                  >
                    ❌ Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PendingDeliveryBoys;
