import React from "react";

import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import Navbar from "./navbar.jsx";
import TopNav from "./top-navbar.jsx";
import axios from "../axios.js";
import { useNavigate, Navigate } from "react-router";
import { ToastContainer } from "react-toastify";

function GlobalLayout() {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  return token ? (
    <div className="flex h-screen w-screen">
      <ToastContainer />
      <Navbar />
      <div className="flex flex-col w-full h-full">
        <TopNav />
        <div className="flex flex-col w-full h-full overflow-y-auto px-12 py-8">
          <div className="flex flex-col w-full h-full border-r-2 border-neutral-300 border-b-2 rounded-3xl z-10 shadow-xl py-12 px-12">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={`/auth`} />
  );
}

export default GlobalLayout;
