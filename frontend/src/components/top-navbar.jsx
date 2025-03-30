import React from "react";
import { useNavigate } from "react-router-dom";

function TopNavbar(props) {
  const user = sessionStorage.getItem("name");
  const navigate = useNavigate();

  return (
    <div className={"flex h-14 w-full items-center justify-end px-8 my-6"}>
      <div className={"text-primary font-extrabold text-2xl pr-8"}>
        G'day {user}
      </div>
      <button
        className={"btn btn-outline btn-primary "}
        onClick={() => {
          sessionStorage.clear();
          navigate("/auth");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default TopNavbar;
