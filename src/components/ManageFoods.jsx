import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Trash, Edit, Eye } from "lucide-react";
import toast from "react-hot-toast";

const ManageFoods = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFood, setSelectedFood] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch only logged-in user's foods
  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    fetch(`http://localhost:3000/manage-foods?authorEmail=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load your foods!");
        setLoading(false);
      });
  }, [user?.email]);

  // Delete food
  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this food?")) return;

    fetch(`http://localhost:3000/foods/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Food deleted successfully!");
          setFoods((prev) => prev.filter((f) => f._id !== id));
        } else {
          toast.error("Deletion failed!");
        }
      })
      .catch(() => toast.error("Failed to delete food."));
  };

  // Update food
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      food_name: form.food_name.value,
      food_image: form.food_image.value,
      food_quantity: form.food_quantity.value,
      pickup_location: form.pickup_location.value,
      expire_date: form.expire_date.value,
      additional_notes: form.additional_notes.value,
    };

    fetch(`http://localhost:3000/foods/${selectedFood._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result.modifiedCount > 0 || data.result.matchedCount > 0) {
          toast.success("Food updated successfully!");
          setFoods((prev) =>
            prev.map((f) =>
              f._id === selectedFood._id ? { ...f, ...updatedData } : f
            )
          );
          setSelectedFood(null);
          setIsEditing(false);
        } else {
          toast.error("Update failed!");
        }
      })
      .catch(() => toast.error("Failed to update food."));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );

  return (
    <div className="bg-[#FCFBF8] min-h-screen py-10">
      {/* Page Header */}
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Manage My Foods</h2>
        <p className="text-gray-500 text-sm mt-1">
          View and edit your food donations
        </p>
      </div>

      {/* Food Cards */}
      <div className="max-w-6xl mx-auto space-y-6 px-6">
        {foods.length === 0 ? (
          <p className="text-center text-gray-600">
            You haven’t added any food yet.
          </p>
        ) : (
          foods.map((food) => (
            <div
              key={food._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-4 md:p-6 flex flex-col md:flex-row items-center gap-6 border border-gray-100"
            >
              {/* Image */}
              <div className="w-full md:w-1/4">
                <img
                  src={food.food_image}
                  alt={food.food_name}
                  className="w-full h-44 object-cover rounded-xl"
                />
              </div>

              {/* Info */}
              <div className="flex-1 w-full">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                  {food.food_name}
                </h3>

                {/* Author Info */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <img
                    src={
                      food.authorImg ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt={food.author || "Anonymous"}
                    className="w-5 h-5 rounded-full"
                  />
                  <span>{food.author || "Anonymous"}</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 text-sm text-gray-700">
                  <p>
                    <span className="font-medium">Quantity:</span>{" "}
                    {food.food_quantity}
                  </p>
                  <p>
                    <span className="font-medium">Pickup Location:</span>{" "}
                    {food.pickup_location}
                  </p>
                  <p>
                    <span className="font-medium">Expires On:</span>{" "}
                    {food.expire_date}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 mt-4 md:mt-0">
                <button
                  onClick={() => setSelectedFood(food)}
                  className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition"
                >
                  <Eye className="w-4 h-4" /> View
                </button>
                <button
                  onClick={() => handleDelete(food._id)}
                  className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition"
                >
                  <Trash className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {selectedFood && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-2xl w-96 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => {
                setSelectedFood(null);
                setIsEditing(false);
              }}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              ✕
            </button>

            {!isEditing ? (
              <>
                <img
                  src={selectedFood.food_image}
                  alt={selectedFood.food_name}
                  className="rounded-xl h-48 w-full object-cover mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">
                  {selectedFood.food_name}
                </h3>
                <p>Quantity: {selectedFood.food_quantity}</p>
                <p>Location: {selectedFood.pickup_location}</p>
                <p>Expire: {selectedFood.expire_date}</p>

                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-primary mt-4 w-full flex items-center justify-center gap-1"
                >
                  <Edit className="w-4 h-4" /> Edit
                </button>
              </>
            ) : (
              <form onSubmit={handleUpdate} className="space-y-3">
                <input
                  name="food_name"
                  defaultValue={selectedFood.food_name}
                  className="input input-bordered w-full"
                  required
                />
                <input
                  name="food_image"
                  defaultValue={selectedFood.food_image}
                  className="input input-bordered w-full"
                  required
                />
                <input
                  name="food_quantity"
                  defaultValue={selectedFood.food_quantity}
                  className="input input-bordered w-full"
                  required
                />
                <input
                  name="pickup_location"
                  defaultValue={selectedFood.pickup_location}
                  className="input input-bordered w-full"
                  required
                />
                <input
                  name="expire_date"
                  type="date"
                  defaultValue={selectedFood.expire_date}
                  className="input input-bordered w-full"
                  required
                />
                <textarea
                  name="additional_notes"
                  defaultValue={selectedFood.additional_notes}
                  className="textarea textarea-bordered w-full"
                ></textarea>

                <button
                  type="submit"
                  className="btn btn-success text-white w-full"
                >
                  Save Changes
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFoods;
