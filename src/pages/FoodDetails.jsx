import React, { useContext } from "react";
import { Download, Edit, Trash } from "lucide-react";
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Button";
import { Link, useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import FoodRequestTable from "./FoodRequestTable";

const FoodDetails = () => {
  const data = useLoaderData();
  const food = data.result;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const {
    _id,
    food_image,
    food_name,
    authorImg,
    food_quantity,
    pickup_location,
    expire_date,
    food_status,
    donator_email,
    notes,
  } = food;

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/foods/${_id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire("Deleted!", "Your food has been deleted.", "success");
            navigate("/available-foods");
          })
          .catch((err) => console.error(err));
      }
    });
  };

  const handleDownload = () => {
    const text = JSON.stringify(food, null, 2);
    const blob = new Blob([text], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${_id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const newRequest = {
      foodId: _id,
      foodOwnerEmail: donator_email,
      requesterEmail: user?.email,
      requesterName: user?.displayName,
      requesterPhoto: user?.photoURL,
      location: form.location.value,
      reason: form.reason.value,
      contactNo: form.contact.value,
      status: "pending",
    };

    fetch("http://localhost:3000/foodRequests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRequest),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("Success!", "Your request has been submitted.", "success");
        form.reset();
        document.getElementById("requestModal").close();
        navigate("/my-requests");
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error!", "Something went wrong!", "error");
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-start mb-6">
          <Button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-black px-6 py-3 rounded-xl"
          >
            Back
          </Button>
        </div>

        <Card className="w-full shadow-2xl rounded-3xl">
          <CardContent className="space-y-6">
            <h1 className="text-4xl font-bold">{food_name}</h1>

            <img
              src={food_image}
              alt={food_name}
              className="w-full h-[450px] object-cover rounded-3xl shadow-lg my-8"
            />
            <p className="text-gray-600 text-lg">by {authorImg}</p>

            <div className="grid grid-cols-2 gap-8 text-lg">
              <div>
                <p className="font-semibold">
                  Quantity: <span className="font-normal">{food_quantity}</span>
                </p>
                <p className="font-semibold">
                  Expires On: <span className="font-normal">{expire_date}</span>
                </p>
              </div>
              <div>
                <p className="font-semibold">
                  Pickup Location:{" "}
                  <span className="font-normal capitalize">
                    {pickup_location}
                  </span>
                </p>
                <p className="font-semibold">
                  Status: <span className="font-normal">{food_status}</span>
                </p>
              </div>
            </div>

            <p className="text-gray-700 leading-8 text-lg whitespace-pre-line">
              {notes}
            </p>

            <div className="flex flex-wrap gap-5 pt-6">
              <Link
                to={`/update-foods/${_id}`}
                className="flex items-center gap-2 px-6 py-3 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
              >
                <Edit size={20} />
                Update
              </Link>
              <Button
                onClick={handleDelete}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-6 py-3 text-lg"
              >
                <Trash size={20} /> Delete
              </Button>
              <Button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 px-6 py-3 text-lg"
              >
                <Download size={20} /> Download
              </Button>

              {user?.email !== donator_email && (
                <Button
                  onClick={() =>
                    document.getElementById("requestModal").showModal()
                  }
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 text-lg text-white rounded-xl"
                >
                  Request Food
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <dialog id="requestModal" className="modal">
          <div className="modal-box bg-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Request This Food
            </h3>

            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Enter your location"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  Why Need Food?
                </label>
                <textarea
                  name="reason"
                  placeholder="Write your reason"
                  className="textarea textarea-bordered w-full"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold mb-1">Contact No.</label>
                <input
                  type="text"
                  name="contact"
                  placeholder="017xxxxxxxx"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button type="submit" className="btn bg-green-600 text-white">
                  Submit Request
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() =>
                    document.getElementById("requestModal").close()
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>

        {user?.email === donator_email && <FoodRequestTable foodId={_id} />}
      </div>
    </div>
  );
};

export default FoodDetails;
