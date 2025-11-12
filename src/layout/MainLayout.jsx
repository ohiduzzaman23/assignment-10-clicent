import React, { Suspense } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Loading from "../pages/Loading";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Suspense fallback={<Loading></Loading>}>
        <Outlet></Outlet>
      </Suspense>

      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
