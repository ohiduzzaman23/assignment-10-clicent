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

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/foods?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setFoods(data);
          setLoading(false);
        })
        .catch(() => {
          toast.error("Failed to load foods!");
          setLoading(false);
        });
    }
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
        }
      })
      .catch(() => toast.error("Failed to delete food."));
  };

  // Update food submit
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
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
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result.modifiedCount > 0 || data.result.matchedCount > 0) {
          toast.success("Food updated successfully!");
          setFoods((prev) =>
            prev.map((f) =>
              f._id === selectedFood._id ? { ...f, ...formData } : f
            )
          );
          setSelectedFood(null);
          setIsEditing(false);
        } else {
          toast.error("Update failed!");
        }
      });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Manage My Foods
      </h2>

      {foods.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven’t added any food yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods.map((food) => (
            <div
              key={food._id}
              className="bg-white rounded-2xl shadow-md p-4 space-y-3 border border-gray-100"
            >
              <img
                src={food.food_image}
                alt={food.food_name}
                className="rounded-xl h-48 w-full object-cover"
              />
              <h3 className="font-semibold text-lg">{food.food_name}</h3>
              <p className="text-sm text-gray-600">
                Quantity: {food.food_quantity}
              </p>
              <p className="text-sm text-gray-600">
                Location: {food.pickup_location}
              </p>
              <p className="text-sm text-gray-600">
                Expire: {food.expire_date}
              </p>

              <div className="flex justify-between items-center mt-3">
                <button
                  onClick={() => setSelectedFood(food)}
                  className="btn btn-sm btn-info text-white flex items-center gap-1"
                >
                  <Eye className="w-4 h-4" /> View
                </button>

                <button
                  onClick={() => handleDelete(food._id)}
                  className="btn btn-sm btn-error text-white flex items-center gap-1"
                >
                  <Trash className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

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
                  placeholder="Food Name"
                />
                <input
                  name="food_image"
                  defaultValue={selectedFood.food_image}
                  className="input input-bordered w-full"
                  placeholder="Food Image URL"
                />
                <input
                  name="food_quantity"
                  defaultValue={selectedFood.food_quantity}
                  className="input input-bordered w-full"
                  placeholder="Quantity"
                />
                <input
                  name="pickup_location"
                  defaultValue={selectedFood.pickup_location}
                  className="input input-bordered w-full"
                  placeholder="Location"
                />
                <input
                  name="expire_date"
                  type="date"
                  defaultValue={selectedFood.expire_date}
                  className="input input-bordered w-full"
                />
                <textarea
                  name="additional_notes"
                  defaultValue={selectedFood.additional_notes}
                  className="textarea textarea-bordered w-full"
                  placeholder="Notes"
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
