import React from "react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router";
import createImage from "/create-account.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import toast from "react-hot-toast";

const Register = () => {
  const handleSignup = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoURL = e.target.photo.value;
    // console.log({ email, password });

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const user = res.user;
        updateProfile(user, {
          displayName: name,
          photoURL: photoURL || "https://via.placeholder.com/88",
        })
          .then(() => {
            console.log("Profile updated");
            toast.success("Signup Successful");
          })
          .catch((error) => {
            console.log(error);
            toast.error("Profile update failed");
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Invalid email or password");
      });
  };
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-8 w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <img src={createImage} alt="" className="w-20" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-center mb-2 text-gray-800">
            Create Account
          </h2>
          <p className="text-center text-gray-500 mb-6 text-sm">
            Join 3D Model Hub and start sharing your creations
          </p>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className="input input-bordered w-full bg-white text-gray-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                className="input input-bordered w-full bg-white text-gray-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Photo URL (Optional)
              </label>
              <input
                type="text"
                name="photo"
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered w-full bg-white text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="********"
                className="input input-bordered w-full bg-white text-gray-700"
                required
              />
            </div>

            <button type="submit" className="btn my-btn">
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="mx-3 text-gray-400 text-sm">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google Button */}
          <button className="btn btn-outline w-full flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-100">
            <FaGoogle className="text-red-500 text-lg" />
            Sign up with Google
          </button>

          {/* Footer Text */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-sky-500 font-medium hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
