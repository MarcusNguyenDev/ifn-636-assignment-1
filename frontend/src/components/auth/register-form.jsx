import React from "react";

function RegisterForm(props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="rounded-md border-2 border-primary z-10 shadow-2xl bg-base-100 p-16 px-8 w-[400px]">
        <div className={"mb-1 text-xl font-bold underline flex text-primary"}>
          Register
        </div>
        <div className="flex items-center text-sm">
          <div>
            <label>{"Already have an account? "}</label>
            <button
              role="button"
              className={"text-primary font-bold underline"}
              onClick={(e) => {
                props.setIsLoggingIn(true);
              }}
            >
              Login now!
            </button>
          </div>
        </div>

        <div className="divider"></div>

        <div className={"grid grid-cols-2 gap-1"}>
          <div>
            <div>First Name</div>
            <input
              className={"w-full input"}
              type="text"
              placeholder="First Name"
            />
          </div>

          <div>
            <div>Last Name</div>
            <input
              className={"w-full input"}
              type="text"
              placeholder="Last Name"
            />
          </div>
        </div>

        <div className={"pt-2"}>
          <div>Email</div>
          <input
            className={"w-full input"}
            type="username"
            placeholder="name@site.com"
          />
        </div>

        <div className={"pt-2"}>
          <div>Password</div>
          <input
            autoComplete="new-password"
            className={"w-full input"}
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <div className={"pt-2"}>
          <div>Re-enter password</div>
          <input
            autoComplete="new-password"
            className={"w-full input"}
            type="password"
            placeholder="Re-enter your password"
          />
        </div>

        <div className="flex w-full flex-col pt-4">
          <button className="btn btn-primary w-full" type={"submit"}>
            Register
          </button>
        </div>
      </div>
    </form>
  );
}

export default RegisterForm;
