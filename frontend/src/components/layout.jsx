import React from "react";
import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import Navbarv from "./navbar.jsx";

function GlobalLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Outlet />
    </div>
  );
}

export default GlobalLayout;
