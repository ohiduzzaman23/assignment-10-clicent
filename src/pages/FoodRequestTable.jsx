import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const FoodRequestTable = ({ foodId }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://assignment-10-server-tau-tan.vercel.app/foodRequests?foodId=${foodId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [foodId]);

  const handleAccept = async (id) => {
    try {
      const res = await fetch(
        `https://assignment-10-server-tau-tan.vercel.app/foodRequests/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "accepted" }),
        }
      );
      const data = await res.json();

      if (data.modifiedCount > 0) {
        Swal.fire("Accepted!", "Food request has been accepted.", "success");

        await fetch(
          `https://assignment-10-server-tau-tan.vercel.app/foods/${foodId}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ food_status: "donated" }),
          }
        );

        setRequests((prev) =>
          prev.map((req) =>
            req._id === id ? { ...req, status: "donated" } : req
          )
        );
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await fetch(
        `https://assignment-10-server-tau-tan.vercel.app/foodRequests/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "donated" }),
        }
      );
      const data = await res.json();

      if (data.modifiedCount > 0) {
        Swal.fire("Rejected!", "Food request has been rejected.", "info");
        setRequests((prev) =>
          prev.map((req) =>
            req._id === id ? { ...req, status: "rejected" } : req
          )
        );
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-8">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (requests.length === 0)
    return (
      <p className="text-center text-gray-500 mt-6">
        No requests found for this food.
      </p>
    );

  return (
    <div className="overflow-x-auto mt-10">
      <h3 className="text-2xl font-bold mb-4 text-center">
        Food Requests ({requests.length})
      </h3>
      <table className="table w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>#</th>
            <th>Requester</th>
            <th>Location</th>
            <th>Reason</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req, index) => (
            <tr key={req._id} className="hover:bg-gray-50">
              <td>{index + 1}</td>
              <td className="flex items-center gap-2">
                <img
                  src={req.requesterPhoto}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-semibold">{req.requesterName}</p>
                  <p className="text-xs text-gray-500">{req.requesterEmail}</p>
                </div>
              </td>
              <td>{req.location}</td>
              <td className="max-w-xs truncate">{req.reason}</td>
              <td>{req.contactNo}</td>
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    req.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : req.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {req.status}
                </span>
              </td>
              <td>
                {req.status === "pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAccept(req._id)}
                      className="btn btn-xs bg-green-600 text-white"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(req._id)}
                      className="btn btn-xs bg-red-500 text-white"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodRequestTable;
