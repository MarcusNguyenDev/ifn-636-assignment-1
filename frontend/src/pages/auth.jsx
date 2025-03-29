import React from "react";
import { useState, useEffect } from "react";
import Logo from "../components/global/logo";

function Auth(props) {
  useState(() => {}, []);

  return (
    <>
      <div className="bg-[url(/src/assets/auth-bg.jpg)] h-screen flex items-center justify-center bg-cover bg-no-repeat">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="rounded-md border-2 border-primary z-10 shadow-2xl bg-base-100 p-16 px-8 max-w-[400px]">
            <div
              className={"mb-1 text-xl font-bold underline flex text-primary"}
            >
              Login
            </div>
            <div className="flex items-center justify-center text-sm pb-2">
              Welcome to our site, please login or register to getting started
            </div>
            <div className="pb-2">
              <label className="input w-full">
                <span className="label">
                  <div className={"text-xl"}>
                    <i className="fa-solid fa-envelopes"></i>
                  </div>
                </span>
                <input
                  className={"w-full"}
                  type="text"
                  placeholder="name@site.com"
                />
              </label>
            </div>

            <div className="pb-2">
              <label className="input w-full">
                <span className="label">
                  <div className={"text-xl"}>
                    <i className="fa-solid fa-lock"></i>
                  </div>
                </span>
                <input
                  className={"w-full "}
                  type="text"
                  placeholder="Enter your password"
                />
              </label>
            </div>
            <div className="pt-3">
              <button className="btn btn-primary w-full" type={"submit"}>
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Auth;
