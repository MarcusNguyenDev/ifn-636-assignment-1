import { useState } from "react";
import { Route, Routes, Navigate } from "react-router";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "../public/font-awesome/css/all.min.css?url";

// Pages
import ActiveOrders from "./pages/active-orders.jsx";
import GlobalLayout from "./components/layout.jsx";
import Auth from "./pages/auth.jsx";
import Menu from "./pages/menu.jsx";
import Users from "./pages/user.jsx";
import Orders from "./pages/order.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<Navigate to="/app" />} />
        <Route index path={"auth"} element={<Auth />} />
        <Route path={"app"} element={<GlobalLayout />}>
          <Route path={"menu"} element={<Menu />} />
          <Route path={"users"} element={<Users />} />
          <Route index element={<Orders />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
