import React from "react";
import { useOutletContext } from "react-router-dom";

function AllDeliveryBoys() {
  const { approvedDeliveryBoys, loading, error } = useOutletContext();

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>All Approved Delivery Boys</h2>
      {approvedDeliveryBoys.length === 0 ? (
        <p>No approved delivery boys</p>
      ) : (
        <ul>
          {approvedDeliveryBoys.map((boy) => (
            <li key={boy._id}>
              {boy.name} – {boy.email} – {boy.mobile}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AllDeliveryBoys;
