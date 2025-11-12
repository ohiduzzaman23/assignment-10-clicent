import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router";

//UpdateModel
const UpdateModel = () => {
  const data = useLoaderData();
  const food = data.result;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      food_name: e.target.food_name.value,
      food_image: e.target.photoURL.value,
      food_quantity: e.target.quantity.value,
      pickup_location: e.target.location.value,
      expire_date: e.target.expireDate.value,
      additional_notes: e.target.notes.value,
    };

    fetch(`http://localhost:3000/foods/${food._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Update Successful");
        navigate("/available-foods");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-8 mt-8 border border-orange-100">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Update Food</h2>
        <p className="text-gray-500 mb-6">
          Update your excess food with the community
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
            defaultValue={food.food_name}
            placeholder=" Your Food Name"
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
            defaultValue={food.food_image}
            placeholder="Enter your photoURL"
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
            defaultValue={food.food_quantity}
            placeholder="Enter Food Quantity"
            className="input input-bordered w-full"
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
            defaultValue={food.pickup_location}
            placeholder="123 Main St, City"
            className="input input-bordered w-full"
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
            defaultValue={food.expire_date}
            className="input input-bordered w-full"
          />
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Notes
          </label>
          <textarea
            name="notes"
            defaultValue={food.additional_notes}
            className="textarea textarea-bordered w-full"
            rows="3"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full my-btn text-white py-2 rounded-md font-semibold"
        >
          Updated
        </button>
      </form>
    </div>
  );
};

export default UpdateModel;
