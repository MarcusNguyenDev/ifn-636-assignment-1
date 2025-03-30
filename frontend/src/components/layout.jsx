import React from "react";

import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import Navbarv from "./navbar.jsx";
import axios from "../axios.js";
import { useAuth } from "../context/auth-context.jsx";
import { useNavigate, Navigate } from "react-router";

function GlobalLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return user ? (
    <div className="flex flex-col h-screen">
      <Outlet />
    </div>
  ) : (
    <Navigate to={`/auth`} />
  );
}

export default GlobalLayout;
