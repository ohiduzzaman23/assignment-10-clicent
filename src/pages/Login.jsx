import React, { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import loginImage from "/login.png";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  console.log(user);
  const location = useLocation();
  const from = location.state || "/";

  // console.log(location);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
        toast.success("Login Successful");
        navigate(from);
      })
      .catch(() => {
        toast.error("Invalid email or password");
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successful");
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-8 w-full max-w-md">
        {user ? (
          <div className="text-center space-y-3">
            <img
              src={user.photoURL || "https://via.placeholder.com/88"}
              alt=""
              className="h-20 w-20 rounded-full mx-auto"
            />
            <h2 className="text-xl font-semibold">
              {user.displayName || "User"}
            </h2>
            <p className="text-gray-700">{user.email}</p>
            <button onClick={handleLogout} className="my-btn">
              Logout
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex justify-center mb-4">
              <img src={loginImage} alt="" className="w-24" />
            </div>
            <h2 className="text-2xl font-semibold text-center mb-2 text-gray-800">
              Welcome Back
            </h2>

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

            <div className="relative">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="********"
                className="input input-bordered w-full bg-white text-gray-700"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-11 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 z-50"
              >
                {showPassword ? <HiEye size={20} /> : <HiEyeOff size={20} />}
              </button>
            </div>

            <button type="submit" className="btn my-btn w-full">
              Login
            </button>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-blue-500 font-medium hover:underline"
              >
                Register here
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
