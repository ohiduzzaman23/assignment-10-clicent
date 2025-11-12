import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routers/Routers.jsx";
import AuthProvider from "./contexts/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router/dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      <Toaster position="top-center" />
    </AuthProvider>
  </StrictMode>
);
