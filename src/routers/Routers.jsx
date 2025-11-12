import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import AvailableFoods from "../pages/AvailableFoods";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ManageFoods from "../components/ManageFoods";
import AddFood from "../components/AddFood";
import FoodRequests from "../components/FoodRequests";
import FoodDetails from "../pages/FoodDetails";
import UpdateModel from "../components/UpdateModel";
import Profile from "../pages/Profile";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import FoodRequestTable from "../pages/FoodRequestTable";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("http://localhost:3000/latest-foods"),
      },
      {
        path: "/available-foods",
        element: (
          <PrivateRoute>
            <AvailableFoods></AvailableFoods>
          </PrivateRoute>
        ),
        loader: () => fetch("http://localhost:3000/foods"),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/add-food",
        element: (
          <PrivateRoute>
            <AddFood></AddFood>
          </PrivateRoute>
        ),
      },
      {
        path: "/food-details/:id",
        element: (
          <PrivateRoute>
            <FoodDetails></FoodDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/foods/${params.id}`),
      },
      {
        path: "/update-foods/:id",
        element: (
          <PrivateRoute>
            <UpdateModel></UpdateModel>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/foods/${params.id}`),
      },
      {
        path: "/manage-foods",
        element: (
          <PrivateRoute>
            <ManageFoods></ManageFoods>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-requests",
        element: <FoodRequestTable></FoodRequestTable>,
      },
    ],
  },
]);
