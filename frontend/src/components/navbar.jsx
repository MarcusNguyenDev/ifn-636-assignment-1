import React from "react";
import Logo from "../components/global/logo.jsx";
import { NavLink } from "react-router-dom";

function Navbar(props) {
  const role = sessionStorage.getItem("role");
  return (
    <div
      className={
        "h-full w-[300px] py-5 bg-primary border-primary border-r-2 text text-primary-content"
      }
    >
      <div
        className={
          "flex flex-col border-primary border-b-2 w-full justify-center items-center font-bold underline"
        }
      >
        <Logo />
        <div>Restaurant Management</div>
      </div>
      <div className="border-primary-content border-1 my-4"></div>

      <div>
        <ul className="flex flex-col gap-2">
          <li>
            <NavLink
              to={"/"}
              type={"button"}
              className={({ isActive }) => "btn btn-outline btn-accent w-full"}
            >
              Active Orders
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/app/menu"}
              type={"button"}
              className={({ isActive }) => "btn btn-outline btn-accent w-full"}
            >
              Menu
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/app/orders"}
              type={"button"}
              className={({ isActive }) => "btn btn-outline btn-accent w-full"}
            >
              Order
            </NavLink>
          </li>

          {role === "ADMIN" ? (
            <li>
              <NavLink
                to={"/app/users"}
                type={"button"}
                className={({ isActive }) =>
                  "btn btn-outline btn-accent w-full"
                }
              >
                Users
              </NavLink>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
