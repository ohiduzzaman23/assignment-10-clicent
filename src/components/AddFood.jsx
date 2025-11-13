import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log("addFood", user);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("You must be logged in to add food!");
      return;
    }

    const formData = {
      food_name: e.target.food_name.value,
      food_image: e.target.photoURL.value,
      food_quantity: e.target.quantity.value,
      pickup_location: e.target.location.value,
      expire_date: e.target.expireDate.value,
      additional_notes: e.target.notes.value,

      author: user.displayName || "Anonymous",
      authorImg: user.photoURL || "https://via.placeholder.com/88",
      authorEmail: user.email,
    };

    fetch("https://assignment-10-server-tau-tan.vercel.app/foods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Food added successfully!");
        e.target.reset();
        navigate("/manage-foods");
      })
      .catch((err) => {
        console.error("Error:", err);
        toast.error("Something went wrong!");
      });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-8 mt-8 border border-orange-100">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Add Food</h2>
        <p className="text-gray-500 mb-6">
          Share your excess food with the community
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Food Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Food Name
          </label>
          <input
            type="text"
            name="food_name"
            placeholder="Enter Food Name"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Food Photo URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Food Photo URL
          </label>
          <input
            type="url"
            name="photoURL"
            placeholder="Enter Your PhotoURL"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Food Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Food Quantity
          </label>
          <input
            type="text"
            name="quantity"
            placeholder="Enter Food Quantity"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Pickup Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Location
          </label>
          <input
            type="text"
            name="location"
            placeholder="123 Main St, City"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Expire Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expire Date
          </label>
          <input
            type="date"
            name="expireDate"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Notes
          </label>
          <textarea
            name="notes"
            placeholder="Any information..."
            className="textarea textarea-bordered w-full"
            rows="3"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full my-btn text-white py-2 rounded-md font-semibold"
        >
          Add Food
        </button>
      </form>
    </div>
  );
};

export default AddFood;
