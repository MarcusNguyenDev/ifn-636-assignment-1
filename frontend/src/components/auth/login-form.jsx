import React from "react";

function LoginForm(props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log(formData.get("password"));
      }}
    >
      <div className="rounded-md border-2 border-primary z-10 shadow-2xl bg-base-100 p-16 px-8 w-[400px]">
        <div className={"mb-1 text-xl font-bold underline flex text-primary"}>
          Login
        </div>
        <div className="flex items-center text-sm pb-2">
          Login to get started. If you don't have an account, please contact us.
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
              type="username"
              name="username"
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
              type="password"
              name="password"
              placeholder="Enter your password"
            />
          </label>
        </div>

        <div className="flex w-full flex-col">
          <button className="btn btn-primary w-full" type={"submit"}>
            Login
          </button>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
