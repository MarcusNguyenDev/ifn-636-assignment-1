import { useState } from "react";
import { Route, Routes, Navigate } from "react-router";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "../public/font-awesome/css/all.min.css";

// Pages
import Dashboard from "./pages/dashboard.jsx";
import GlobalLayout from "./components/layout.jsx";
import Auth from "./pages/auth.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<Navigate to="/app" />} />
        <Route index path={"/auth"} element={<Auth />} />
        <Route path={"/app"} element={<GlobalLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
