import { useNavigate } from "react-router";

const FoodCard = ({ food }) => {
  const navigate = useNavigate();
  const {
    _id,
    food_image,
    food_name,
    author,
    authorImg,
    food_quantity,
    pickup_location,
    expire_date,
  } = food;

  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden transition transform hover:scale-[1.02] hover:shadow-xl cursor-pointer w-full">
      <img
        src={food_image}
        alt={food_name}
        className="w-full h-66 object-cover"
      />
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold text-gray-800">{food_name}</h2>

        {/* Food provider info */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <img
            src={
              authorImg ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt={author}
            className="w-5 h-5 rounded-full"
          />
          <span>{author || "Unknown Provider"}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span>👥</span>
          <span>{food_quantity}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span>📍</span>
          <span className="capitalize">{pickup_location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span>📅</span>
          <span>Expires: {expire_date}</span>
        </div>

        <button
          onClick={() => navigate(`/food-details/${_id}`)}
          className="w-full my-btn transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
